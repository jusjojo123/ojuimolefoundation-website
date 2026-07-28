"use client"

import { useState } from "react"

function toEmbed(url: string): { kind: "iframe" | "file"; src: string } {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1` }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` }
  return { kind: "file", src: url }
}

export function VideoPlayer({
  url,
  poster,
  title,
}: {
  url: string
  poster?: string | null
  title?: string
}) {
  const [playing, setPlaying] = useState(false)
  const embed = toEmbed(url)

  if (playing) {
    if (embed.kind === "iframe") {
      return (
        <iframe
          src={embed.src}
          title={title ?? "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      )
    }
    return (
      <video src={embed.src} poster={poster ?? undefined} controls autoPlay className="absolute inset-0 h-full w-full object-cover">
        <track kind="captions" />
      </video>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 flex items-center justify-center"
      aria-label={`Play ${title ?? "video"}`}
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/60 bg-background/40 transition-colors group-hover:border-gold">
        <svg className="ml-1 h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  )
}
