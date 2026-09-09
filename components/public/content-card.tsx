import Image from "next/image"
import Link from "next/link"
import type { Content } from "@/lib/db/schema"
import { contentTypePath } from "@/lib/content-config"

function formatDate(d: Date | string | null): string {
  if (!d) return ""
  const date = typeof d === "string" ? new Date(d) : d
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export function ContentCard({ item }: { item: Content }) {
  const href = `/${contentTypePath(item.type)}/${item.slug}`
  const image = item.coverImage || item.gallery?.[0]?.url || ""
  const date = formatDate(item.eventDate ?? item.publishDate ?? item.publishedAt)

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-lg border border-gold/15 bg-card/40 transition-colors hover:border-gold/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image || "/placeholder.svg"}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gold/20 font-heading text-2xl">
            Ojú Imọ̀lẹ̀
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {item.category && (
          <span className="text-[10px] uppercase tracking-wider text-gold/70">{item.category}</span>
        )}
        <h3 className="font-heading text-lg text-cream text-balance leading-tight group-hover:text-gold transition-colors">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-sm text-cream/60 leading-relaxed line-clamp-3">{item.excerpt}</p>
        )}
        {date && <span className="mt-auto pt-2 text-xs text-cream/40">{date}</span>}
      </div>
    </Link>
  )
}
