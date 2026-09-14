import { sanitizeHtml } from "@/lib/sanitize-html"

/** Renders admin-authored HTML after sanitizing it on the server. */
export function RichContent({ html, className }: { html: string; className?: string }) {
  if (!html?.trim()) return null
  const clean = sanitizeHtml(html)
  return (
    <div
      className={`rich-content ${className ?? ""}`}
      // Content is sanitized on the server above; safe to inject.
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
