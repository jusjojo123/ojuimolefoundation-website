import Image from "next/image"
import type { Content } from "@/lib/db/schema"
import { CONTENT_TYPES, type ContentType } from "@/lib/content-config"
import { RichContent } from "@/components/public/rich-content"
import { VideoEmbed } from "@/components/public/video-embed"
import { GalleryViewer } from "@/components/public/gallery-viewer"
import { ShareButtons } from "@/components/public/share-buttons"

function formatDate(d: Date | string | null): string {
  if (!d) return ""
  const date = typeof d === "string" ? new Date(d) : d
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export function ContentDetail({ item, shareUrl }: { item: Content; shareUrl: string }) {
  const cfg = CONTENT_TYPES[item.type as ContentType]
  const fields = cfg?.fields
  const displayDate = formatDate(item.eventDate ?? item.publishDate ?? item.publishedAt)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Eyebrow */}
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-gold/70">
        <span>{cfg?.label ?? item.type}</span>
        {item.category && <span className="text-cream/40">· {item.category}</span>}
      </div>

      {/* Title */}
      <h1 className="mt-4 font-heading text-3xl leading-tight text-cream text-balance sm:text-4xl">
        {item.title}
      </h1>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-cream/50">
        {item.authorName && <span>By {item.authorName}</span>}
        {displayDate && <span>{displayDate}</span>}
        {fields?.location && item.location && <span>{item.location}</span>}
      </div>

      {item.excerpt && (
        <p className="mt-6 text-lg leading-relaxed text-cream/70 text-pretty">{item.excerpt}</p>
      )}

      {/* Primary media */}
      {fields?.videoUrl && item.videoUrl && (
        <div className="mt-8">
          <VideoEmbed url={item.videoUrl} title={item.title} />
        </div>
      )}

      {(!fields?.videoUrl || !item.videoUrl) && item.coverImage && (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-lg border border-gold/15">
          <Image src={item.coverImage || "/placeholder.svg"} alt={item.title} fill sizes="768px" className="object-cover" priority />
        </div>
      )}

      {fields?.audioUrl && item.audioUrl && (
        <div className="mt-8 rounded-lg border border-gold/15 bg-card/40 p-4">
          <audio controls src={item.audioUrl} className="w-full" preload="metadata">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* Body */}
      {fields?.body && item.body && <RichContent html={item.body} className="mt-8" />}

      {/* Document download */}
      {fields?.documentUrl && item.documentUrl && (
        <div className="mt-8">
          <a
            href={item.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-3 text-gold transition-colors hover:bg-gold/10"
          >
            Download document
          </a>
        </div>
      )}

      {/* Gallery */}
      {item.gallery && item.gallery.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 font-heading text-xl text-cream">Gallery</h2>
          <GalleryViewer images={item.gallery} />
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border border-gold/20 px-3 py-1 text-xs text-cream/60">
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Share */}
      <div className="mt-10 border-t border-gold/10 pt-6">
        <ShareButtons url={shareUrl} title={item.title} />
      </div>
    </article>
  )
}
