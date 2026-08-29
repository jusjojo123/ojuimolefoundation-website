"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { saveContent } from "@/app/actions/content"
import { MediaUploader } from "@/components/admin/media-uploader"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import {
  CONTENT_TYPES,
  CONTENT_TYPE_LIST,
  CATEGORIES,
  type ContentType,
} from "@/lib/content-config"
import type { Content, GalleryImage } from "@/lib/db/schema"

type Props = {
  initial?: Content
  defaultType?: ContentType
  canPublish?: boolean
}

const inputClass =
  "w-full rounded-md bg-background border border-border px-4 py-2.5 text-cream outline-none focus:border-gold/60 transition-colors"
const labelClass = "text-sm text-cream/70 tracking-wide"

function toDateInput(d: Date | string | null | undefined): string {
  if (!d) return ""
  const date = typeof d === "string" ? new Date(d) : d
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString().slice(0, 10)
}

export function ContentEditor({ initial, defaultType, canPublish = true }: Props) {
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
  const [audioUrl, setAudioUrl] = useState(initial?.audioUrl ?? "")
  const [documentUrl, setDocumentUrl] = useState(initial?.documentUrl ?? "")
  const [gallery, setGallery] = useState<GalleryImage[]>(initial?.gallery ?? [])
  const [tags, setTags] = useState<string[]>(initial?.tags ?? [])
  const [tagInput, setTagInput] = useState("")
  const [location, setLocation] = useState(initial?.location ?? "")
  const [eventDate, setEventDate] = useState(toDateInput(initial?.eventDate))
  const [publishDate, setPublishDate] = useState(toDateInput(initial?.publishDate))
  const [authorName, setAuthorName] = useState(initial?.authorName ?? "")
  const [seoTitle, setSeoTitle] = useState(initial?.seoTitle ?? "")
  const [seoDescription, setSeoDescription] = useState(initial?.seoDescription ?? "")
  const [socialImage, setSocialImage] = useState(initial?.socialImage ?? "")
  const [featured, setFeatured] = useState(initial?.featured ?? false)
  const [showSeo, setShowSeo] = useState(false)

  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState<null | "draft" | "published">(null)

  const fields = useMemo(() => CONTENT_TYPES[type].fields, [type])
  const typeLabel = CONTENT_TYPES[type].label

  function addTag() {
    const t = tagInput.trim()
    if (t && !tags.includes(t)) setTags([...tags, t])
    setTagInput("")
  }

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
      audioUrl,
      documentUrl,
      gallery,
      tags,
      location,
      eventDate: eventDate || null,
      publishDate: publishDate || null,
      authorName,
      seoTitle,
      seoDescription,
      socialImage,
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
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder={`Enter a ${typeLabel.toLowerCase()} title`} />
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
          <label className={labelClass}>{type === "gallery" ? "Caption" : "Summary"}</label>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className={inputClass} placeholder="A short summary shown in listings and social shares" />
        </div>
      )}

      {/* Cover image */}
      {fields.coverImage && (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>{type === "gallery" ? "Photo" : "Featured Image"}</label>
          {coverImage && (
            <div className="relative w-full max-w-sm aspect-video rounded-md overflow-hidden border border-border">
              <Image src={coverImage || "/placeholder.svg"} alt="Cover preview" fill className="object-cover" />
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

      {/* Audio */}
      {fields.audioUrl && (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Audio Recording</label>
          {audioUrl && <audio controls src={audioUrl} className="w-full max-w-sm" />}
          <div className="flex items-center gap-3">
            <MediaUploader accept="audio" onUploaded={setAudioUrl} label={audioUrl ? "Replace audio" : "Upload audio"} />
            {audioUrl && (
              <button type="button" onClick={() => setAudioUrl("")} className="text-xs text-red-400 hover:underline">
                Remove
              </button>
            )}
          </div>
        </div>
      )}

      {/* Document / PDF */}
      {fields.documentUrl && (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Document / PDF</label>
          <div className="flex items-center gap-3">
            <MediaUploader accept="document" onUploaded={setDocumentUrl} label={documentUrl ? "Replace document" : "Upload document"} />
            {documentUrl && (
              <>
                <a href={documentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-gold hover:underline">
                  View file
                </a>
                <button type="button" onClick={() => setDocumentUrl("")} className="text-xs text-red-400 hover:underline">
                  Remove
                </button>
              </>
            )}
          </div>
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

      {/* Author & publication date */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Author Name (optional)</label>
          <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} className={inputClass} placeholder="Defaults to your account name" />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelClass}>Publication Date (optional)</label>
          <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* Body — rich text */}
      {fields.body && (
        <div className="flex flex-col gap-2">
          <label className={labelClass}>{fields.richText ? "Full Content" : "Description"}</label>
          {fields.richText ? (
            <RichTextEditor value={body} onChange={setBody} placeholder="Write the full content here…" />
          ) : (
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} className={`${inputClass} leading-relaxed`} placeholder="Write a description…" />
          )}
        </div>
      )}

      {/* Gallery */}
      {fields.gallery && <GalleryEditor gallery={gallery} setGallery={setGallery} />}

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <label className={labelClass}>Tags</label>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs px-3 py-1">
                {t}
                <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} className="hover:text-red-400" aria-label={`Remove ${t}`}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault()
              addTag()
            }
          }}
          onBlur={addTag}
          className={inputClass}
          placeholder="Type a tag and press Enter"
        />
      </div>

      {/* SEO & social (collapsible) */}
      <div className="rounded-md border border-border">
        <button
          type="button"
          onClick={() => setShowSeo((s) => !s)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm text-cream/80 hover:text-cream"
        >
          <span>SEO &amp; Social Sharing</span>
          <span className="text-cream/40">{showSeo ? "−" : "+"}</span>
        </button>
        {showSeo && (
          <div className="flex flex-col gap-4 border-t border-border p-4">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>SEO Title</label>
              <input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={inputClass} placeholder="Defaults to the title" />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>SEO Description</label>
              <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={2} className={inputClass} placeholder="Defaults to the summary" />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Social Sharing Image</label>
              {socialImage && (
                <div className="relative w-full max-w-sm aspect-video rounded-md overflow-hidden border border-border">
                  <Image src={socialImage || "/placeholder.svg"} alt="Social image preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <MediaUploader accept="image" onUploaded={setSocialImage} label={socialImage ? "Replace image" : "Upload image"} />
                {socialImage && (
                  <button type="button" onClick={() => setSocialImage("")} className="text-xs text-red-400 hover:underline">
                    Remove
                  </button>
                )}
              </div>
              <span className="text-xs text-cream/40">Defaults to the featured image if left blank.</span>
            </div>
          </div>
        )}
      </div>

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
        {canPublish && (
          <button
            onClick={() => save("published")}
            disabled={saving !== null}
            className="rounded-md gold-gradient text-primary-foreground font-medium tracking-wide px-6 py-2.5 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving === "published" ? "Publishing…" : "Publish"}
          </button>
        )}
        <button
          onClick={() => save("draft")}
          disabled={saving !== null}
          className="rounded-md border border-border text-cream/80 px-6 py-2.5 hover:border-gold/40 hover:text-cream transition-colors disabled:opacity-50"
        >
          {saving === "draft" ? "Saving…" : "Save Draft"}
        </button>
        {!canPublish && (
          <span className="text-xs text-cream/40">
            Your account can save drafts. An administrator can publish them.
          </span>
        )}
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
  function move(from: number, to: number) {
    if (to < 0 || to >= gallery.length) return
    const next = [...gallery]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    setGallery(next)
  }
  return (
    <div className="flex flex-col gap-3">
      <label className={labelClass}>Photo Gallery</label>
      {gallery.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gallery.map((img, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="relative aspect-square rounded-md overflow-hidden border border-border">
                <Image src={img.url || "/placeholder.svg"} alt={img.alt ?? ""} fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setGallery(gallery.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 rounded bg-background/80 text-red-400 text-xs px-2 py-1 hover:bg-background"
                >
                  Remove
                </button>
                <div className="absolute bottom-1 left-1 flex gap-1">
                  <button type="button" onClick={() => move(i, i - 1)} className="rounded bg-background/80 text-cream text-xs px-1.5 py-0.5 hover:bg-background disabled:opacity-30" disabled={i === 0} aria-label="Move left">
                    ←
                  </button>
                  <button type="button" onClick={() => move(i, i + 1)} className="rounded bg-background/80 text-cream text-xs px-1.5 py-0.5 hover:bg-background disabled:opacity-30" disabled={i === gallery.length - 1} aria-label="Move right">
                    →
                  </button>
                </div>
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
