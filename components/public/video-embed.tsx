/** Renders a YouTube/Vimeo embed, or a native <video> for uploaded files. */
export function VideoEmbed({ url, title }: { url: string; title?: string }) {
  if (!url) return null

  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  )
  if (yt) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg border border-gold/15" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          src={`https://www.youtube.com/embed/${yt[1]}`}
          title={title ?? "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    )
  }

  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) {
    return (
      <div className="relative w-full overflow-hidden rounded-lg border border-gold/15" style={{ aspectRatio: "16 / 9" }}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeo[1]}`}
          title={title ?? "Video"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    )
  }

  return (
    <video controls src={url} className="w-full rounded-lg border border-gold/15" preload="metadata">
      Your browser does not support the video tag.
    </video>
  )
}
