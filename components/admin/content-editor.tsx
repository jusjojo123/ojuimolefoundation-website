"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { saveContent } from "@/app/actions/content"
import { MediaUploader } from "@/components/admin/media-uploader"
import {
  CONTENT_TYPES,
  CONTENT_TYPE_LIST,
  CATEGORIES,
  type ContentType,
} from "@/lib/content-config"
import type { Content, GalleryImage } from "@/lib/db/schema"

type Props = { initial?: Content; defaultType?: ContentType }

const inputClass =
  "w-full rounded-md bg-background border border-border px-4 py-2.5 text-cream outline-none focus:border-gold/60 transition-colors"
const labelClass = "text-sm text-cream/70 tracking-wide"

function toDateInput(d: Date | string | null | undefined): string {
  if (!d) return ""
  const date = typeof d === "string" ? new Date(d) : d
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString().slice(0, 10)
}

export function ContentEditor({ initial, defaultType }: Props) {
  const router = useRouter()
  const [type, setType] = useState<ContentType>(
    (initial?.type as ContentType) ?? defaultType ?? "article",
  )
  const [title, setTitle] = useState(initial?.title ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "")
  const [body, setBody] = useState(initial?.body ?? "")
  const [category, setCategory] = useState(initial?.category ?? "")
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "")
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "")
  const [gallery, setGallery] = useState<GalleryImage[]>(initial?.gallery ?? [])
  const [location, setLocation] = useState(initial?.location ?? "")
  const [eventDate, setEventDate] = useState(toDateInput(initial?.eventDate))
  const [featured, setFeatured] = useState(initial?.featured ?? false)

  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState<null | "draft" | "published">(null)

  const fields = useMemo(() => CONTENT_TYPES[type].fields, [type])

  async function save(status: "draft" | "published") {
    setError(null)
    setSaving(status)
    const res = await saveContent({
      id: initial?.id,
      type,
      title,
      slug,
      excerpt,
      body,
      category,
      coverImage,
      videoUrl,
      gallery,
      location,
      eventDate: eventDate || null,
      featured,
      status,
    })
    setSaving(null)
    if (!res.ok) {
      setError(res.error)
      return
    }
    router.push("/admin/dashboard")
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Type */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>Content Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as ContentType)}
          className={inputClass}
          disabled={!!initial}
        >
          {CONTENT_TYPE_LIST.map((c) => (
            <option key={c.type} value={c.type}>
              {c.label}
            </option>
          ))}
        </select>
        {initial && (
          <span className="text-xs text-cream/40">
            Type can&apos;t be changed after creation.
          </span>
        )}
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Enter a title" />
      </div>

      {/* Slug */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>URL Slug (optional)</label>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} placeholder="auto-generated-from-title" />
        <span className="text-xs text-cream/40">Leave blank to generate from the title.</span>
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
          <option value="">— Select a category —</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Excerpt */}
      {fields.excerpt && (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>{type === "gallery" ? "Caption" : "Excerpt / Summary"}</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className={inputClass} placeholder="A short summary shown in listings" />
        </div>
      )}

      {/* Cover image */}
      {fields.coverImage && (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>{type === "gallery" ? "Photo" : "Cover Image"}</label>
          {coverImage && (
            <div className="relative w-full max-w-sm aspect-video rounded-md overflow-hidden border border-border">
              <Image src={coverImage} alt="Cover preview" fill className="object-cover" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <MediaUploader accept="image" onUploaded={setCoverImage} label={coverImage ? "Replace image" : "Upload image"} />
            {coverImage && (
              <button type="button" onClick={() => setCoverImage("")} className="text-xs text-red-400 hover:underline">
                Remove
              </button>
            )}
          </div>
        </div>
      )}

      {/* Video */}
      {fields.videoUrl && (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Video</label>
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className={inputClass} placeholder="Paste a YouTube/Vimeo URL, or upload a file" />
          <MediaUploader accept="video" onUploaded={setVideoUrl} label="Upload video file" />
          {videoUrl && <span className="text-xs text-cream/40 break-all">{videoUrl}</span>}
        </div>
      )}

      {/* Location & event date */}
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.location && (
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} placeholder="e.g. Port of Spain" />
          </div>
        )}
        {fields.eventDate && (
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Event Date</label>
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={inputClass} />
          </div>
        )}
      </div>

      {/* Body */}
      {fields.body && (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Body</label>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={12} className={`${inputClass} font-sans leading-relaxed`} placeholder="Write the full content here…" />
          <span className="text-xs text-cream/40">Plain text and line breaks are preserved.</span>
        </div>
      )}

      {/* Gallery */}
      {fields.gallery && (
        <GalleryEditor gallery={gallery} setGallery={setGallery} />
      )}

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="h-4 w-4 accent-[#c9a227]" />
        <span className="text-sm text-cream/80">Feature this on the public site</span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-md px-4 py-3">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
        <button
          onClick={() => save("published")}
          disabled={saving !== null}
          className="rounded-md gold-gradient text-primary-foreground font-medium tracking-wide px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving === "published" ? "Publishing…" : "Publish"}
        </button>
        <button
          onClick={() => save("draft")}
          disabled={saving !== null}
          className="rounded-md border border-border text-cream/80 px-6 py-2.5 hover:border-gold/40 hover:text-cream transition-colors disabled:opacity-50"
        >
          {saving === "draft" ? "Saving…" : "Save Draft"}
        </button>
        <button
          onClick={() => router.push("/admin/dashboard")}
          disabled={saving !== null}
          className="text-sm text-cream/50 hover:text-cream transition-colors ml-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function GalleryEditor({
  gallery,
  setGallery,
}: {
  gallery: GalleryImage[]
  setGallery: (g: GalleryImage[]) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className={labelClass}>Photo Gallery</label>
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((img, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="relative aspect-square rounded-md overflow-hidden border border-border">
                <Image src={img.url} alt={img.alt ?? ""} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setGallery(gallery.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 rounded bg-background/80 text-red-400 text-xs px-2 py-1 hover:bg-background"
                >
                  Remove
                </button>
              </div>
              <input
                value={img.alt ?? ""}
                onChange={(e) =>
                  setGallery(gallery.map((g, idx) => (idx === i ? { ...g, alt: e.target.value } : g)))
                }
                className="w-full rounded bg-background border border-border px-2 py-1 text-xs text-cream outline-none focus:border-gold/60"
                placeholder="Alt text / caption"
              />
            </div>
          ))}
        </div>
      )}
      <MediaUploader
        accept="image"
        label="Add photo to gallery"
        onUploaded={(url) => setGallery([...gallery, { url, alt: "" }])}
      />
    </div>
  )
}
