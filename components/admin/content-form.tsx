"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createContent, updateContent } from "@/app/actions/content"
import { ImageUploader } from "@/components/admin/image-uploader"
import { AdminInput, AdminTextarea, AdminButton } from "@/components/admin/ui"
import type { ContentTypeConfig } from "@/lib/content-types"
import type { ContentItem } from "@/lib/db/schema"

function toDateTimeLocal(d: Date | string | null): string {
  if (!d) return ""
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return ""
  const tzOffset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16)
}

export function ContentForm({
  config,
  item,
}: {
  config: ContentTypeConfig
  item?: ContentItem
}) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fields = config.fields

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    const formData = new FormData(e.currentTarget)
    formData.set("type", config.type)
    // checkbox → normalize to on/off
    formData.set("published", formData.get("published") ? "true" : "false")
    try {
      if (item) {
        await updateContent(item.id, formData)
      } else {
        await createContent(formData)
      }
      router.push(`/admin/${config.type}`)
      router.refresh()
    } catch (err) {
      setError((err as Error).message || "Something went wrong")
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <AdminInput
        label="Title"
        name="title"
        required
        defaultValue={item?.title ?? ""}
        placeholder={`${config.label} title`}
      />

      {fields.includes("description") && (
        <AdminTextarea
          label="Short description"
          name="description"
          rows={2}
          defaultValue={item?.description ?? ""}
          placeholder="A brief summary shown in listings"
        />
      )}

      {fields.includes("body") && (
        <AdminTextarea
          label="Full content"
          name="body"
          rows={8}
          defaultValue={item?.body ?? ""}
          placeholder="Write the full content here..."
        />
      )}

      {fields.includes("video") && (
        <AdminInput
          label="Video link (YouTube, Vimeo, etc.)"
          name="videoUrl"
          type="url"
          defaultValue={item?.videoUrl ?? ""}
          placeholder="https://youtube.com/watch?v=..."
        />
      )}

      {fields.includes("location") && (
        <AdminInput
          label="Location"
          name="location"
          defaultValue={item?.location ?? ""}
          placeholder="City, venue, or address"
        />
      )}

      {fields.includes("eventDate") && (
        <AdminInput
          label="Date & time"
          name="eventDate"
          type="datetime-local"
          defaultValue={toDateTimeLocal(item?.eventDate ?? null)}
        />
      )}

      {fields.includes("image") && (
        <ImageUploader name="imageUrl" defaultValue={item?.imageUrl} label="Image" />
      )}

      <AdminInput
        label="Sort order (lower shows first)"
        name="sortOrder"
        type="number"
        defaultValue={String(item?.sortOrder ?? 0)}
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          name="published"
          defaultChecked={item?.published ?? false}
          className="h-5 w-5 rounded border-border accent-[var(--color-gold)]"
        />
        <span className="text-sm text-cream">Published (visible on the website)</span>
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-3">
        <AdminButton type="submit" disabled={saving}>
          {saving ? "Saving..." : item ? "Save changes" : `Create ${config.label.toLowerCase()}`}
        </AdminButton>
        <AdminButton type="button" variant="ghost" onClick={() => router.push(`/admin/${config.type}`)}>
          Cancel
        </AdminButton>
      </div>
    </form>
  )
}
