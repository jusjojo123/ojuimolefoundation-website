import DOMPurify from "isomorphic-dompurify"

const ALLOWED_TAGS = [
  "p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "blockquote", "pre", "code", "hr",
  "img", "figure", "figcaption", "span",
]
const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "title", "class"]

/** Renders admin-authored HTML after sanitizing it on the server. */
export function RichContent({ html, className }: { html: string; className?: string }) {
  if (!html?.trim()) return null
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i,
  })
  return (
    <div
      className={`rich-content ${className ?? ""}`}
      // Content is sanitized above; safe to inject.
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
