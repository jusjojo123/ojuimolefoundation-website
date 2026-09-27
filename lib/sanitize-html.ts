// Lightweight, dependency-free HTML sanitizer for rich-text content produced
// by the TipTap editor. Runs on the server (no jsdom / DOM required).
//
// Strategy: allowlist tags and attributes, strip everything else, and neutralize
// dangerous URL schemes. The editor only emits a small, known set of tags, so an
// allowlist is both safe and sufficient here.

const ALLOWED_TAGS = new Set([
  "p", "br", "hr",
  "h1", "h2", "h3", "h4",
  "strong", "b", "em", "i", "u", "s", "strike",
  "blockquote", "code", "pre",
  "ul", "ol", "li",
  "a", "img",
  "figure", "figcaption",
  "span",
  "iframe", // for embedded video
])

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel"]),
  img: new Set(["src", "alt", "title", "width", "height"]),
  iframe: new Set(["src", "width", "height", "allow", "allowfullscreen", "frameborder", "title"]),
}

// Only these iframe hosts are permitted (video embeds).
const ALLOWED_IFRAME_HOSTS = [
  "youtube.com", "www.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com",
  "player.vimeo.com",
]

function isSafeUrl(value: string): boolean {
  const v = value.trim().toLowerCase()
  if (v.startsWith("javascript:") || v.startsWith("data:") || v.startsWith("vbscript:")) {
    return false
  }
  return true
}

function isAllowedIframeSrc(value: string): boolean {
  try {
    const url = new URL(value, "https://placeholder.local")
    return ALLOWED_IFRAME_HOSTS.some(
      (h) => url.hostname === h || url.hostname.endsWith("." + h),
    )
  } catch {
    return false
  }
}

/**
 * Sanitize an HTML string against the allowlist above.
 * Removes disallowed tags (keeping their text where sensible) and strips
 * unsafe attributes and URL schemes.
 */
export function sanitizeHtml(dirty: string | null | undefined): string {
  if (!dirty) return ""

  // Remove script/style blocks entirely (including their content).
  let html = dirty
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    // Strip HTML comments.
    .replace(/<!--[\s\S]*?-->/g, "")

  // Walk every tag and rebuild it from allowed pieces only.
  html = html.replace(/<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^<>]*?))\/?>/g, (match, closing, rawName, rawAttrs) => {
    const name = rawName.toLowerCase()
    if (!ALLOWED_TAGS.has(name)) return "" // drop the tag markup (text between tags is kept)

    if (closing === "/") return `</${name}>`

    const allowed = ALLOWED_ATTRS[name]
    if (!allowed) return `<${name}>`

    const attrs: string[] = []
    const attrRe = /([a-zA-Z][a-zA-Z0-9-]*)\s*=\s*("([^"]*)"|'([^']*)')/g
    let m: RegExpExecArray | null
    while ((m = attrRe.exec(rawAttrs)) !== null) {
      const attrName = m[1].toLowerCase()
      const attrValue = m[3] ?? m[4] ?? ""
      if (!allowed.has(attrName)) continue

      // URL attribute safety.
      if ((attrName === "href" || attrName === "src") && !isSafeUrl(attrValue)) continue
      if (name === "iframe" && attrName === "src" && !isAllowedIframeSrc(attrValue)) return ""

      // Escape double quotes in the value.
      const safeValue = attrValue.replace(/"/g, "&quot;")
      attrs.push(`${attrName}="${safeValue}"`)
    }

    // Force safe rel/target on links.
    if (name === "a") {
      if (!attrs.some((a) => a.startsWith("rel="))) attrs.push('rel="noopener noreferrer"')
    }

    return `<${name}${attrs.length ? " " + attrs.join(" ") : ""}>`
  })

  return html
}
