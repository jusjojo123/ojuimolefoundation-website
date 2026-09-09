"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { uploadFileWithProgress } from "@/lib/upload-client"
import { saveMedia, listMedia, deleteMedia, updateMedia } from "@/app/actions/media"
import type { Media } from "@/lib/db/schema"

type Kind = "all" | "image" | "video" | "audio" | "document"

const KINDS: { value: Kind; label: string }[] = [
  { value: "all", label: "All" },
  { value: "image", label: "Images" },
  { value: "video", label: "Videos" },
  { value: "audio", label: "Audio" },
  { value: "document", label: "Documents" },
]

function kindOf(contentType: string | null | undefined, filename: string | null | undefined): "image" | "video" | "audio" | "document" {
  const ct = contentType ?? ""
  if (ct.startsWith("image/")) return "image"
  if (ct.startsWith("video/")) return "video"
  if (ct.startsWith("audio/")) return "audio"
  const ext = (filename ?? "").toLowerCase().split(".").pop() ?? ""
  if (["jpg", "jpeg", "png", "webp", "gif", "avif"].includes(ext)) return "image"
  if (["mp4", "webm", "mov", "ogv"].includes(ext)) return "video"
  if (["mp3", "wav", "ogg", "m4a", "aac"].includes(ext)) return "audio"
  return "document"
}

export function MediaLibrary({
  initialItems,
  canDelete,
}: {
  initialItems: Media[]
  canDelete: boolean
}) {
  const [items, setItems] = useState<Media[]>(initialItems)
  const [kind, setKind] = useState<Kind>("all")
  const [search, setSearch] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadPct, setUploadPct] = useState(0)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [editing, setEditing] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  async function refresh(nextKind = kind, nextSearch = search) {
    const rows = await listMedia({ kind: nextKind, search: nextSearch })
    setItems(rows)
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        setUploadPct(0)
        const result = await uploadFileWithProgress(file, (pct) => setUploadPct(pct))
        await saveMedia({
          url: result.url,
          kind: kindOf(file.type, file.name),
          filename: file.name,
          title: file.name.replace(/\.[^.]+$/, ""),
          contentType: file.type,
          size: file.size,
          pathname: result.pathname,
        })
      }
      await refresh()
    } catch (err) {
      console.log("[v0] media upload error:", err)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
      setUploadPct(0)
    }
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-1 rounded-lg bg-card border border-border p-1">
          {KINDS.map((k) => (
            <button
              key={k.value}
              onClick={() => {
                setKind(k.value)
                startTransition(() => refresh(k.value))
              }}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                kind === k.value ? "bg-gold/20 text-gold" : "text-cream/60 hover:text-cream"
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              startTransition(() => refresh(kind, search))
            }
          }}
          placeholder="Search title, filename, or tags…"
          className="flex-1 rounded-lg bg-background border border-border px-4 py-2 text-sm text-cream outline-none focus:border-gold/60"
        />
        <label className="cursor-pointer rounded-lg gold-gradient px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity text-center whitespace-nowrap">
          {uploading ? `Uploading ${uploadPct}%…` : "Upload Files"}
          <input
            type="file"
            multiple
            accept="image/*,video/*,audio/*,application/pdf,.pdf,.doc,.docx"
            className="hidden"
            disabled={uploading}
            onChange={(e) => handleUpload(e.target.files)}
          />
        </label>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-20 text-center text-cream/40">
          No media yet. Upload files to build your library.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((m) => (
            <div key={m.id} className="rounded-lg bg-card border border-border overflow-hidden group">
              <div className="relative aspect-square bg-background flex items-center justify-center">
                {m.kind === "image" ? (
                  <Image src={m.url || "/placeholder.svg"} alt={m.alt ?? m.title ?? ""} fill className="object-cover" />
                ) : (
                  <span className="text-cream/40 text-xs uppercase tracking-wider">{m.kind}</span>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs text-cream truncate" title={m.title ?? m.filename ?? ""}>
                  {m.title ?? m.filename ?? "Untitled"}
                </p>
                {m.tags.length > 0 && (
                  <p className="text-[10px] text-gold/60 truncate mt-0.5">{m.tags.join(", ")}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(m.url)
                      setCopiedId(m.id)
                      setTimeout(() => setCopiedId(null), 1500)
                    }}
                    className="text-[11px] text-cream/60 hover:text-gold transition-colors"
                  >
                    {copiedId === m.id ? "Copied!" : "Copy URL"}
                  </button>
                  <button
                    onClick={() => setEditing(editing === m.id ? null : m.id)}
                    className="text-[11px] text-cream/60 hover:text-gold transition-colors"
                  >
                    Edit
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => {
                        if (!confirm("Delete this file permanently?")) return
                        startTransition(async () => {
                          await deleteMedia(m.id)
                          setItems((prev) => prev.filter((x) => x.id !== m.id))
                        })
                      }}
                      className="text-[11px] text-red-400/70 hover:text-red-400 transition-colors ml-auto"
                    >
                      Delete
                    </button>
                  )}
                </div>

                {editing === m.id && (
                  <MediaEditForm
                    item={m}
                    onSaved={(patch) => {
                      setItems((prev) => prev.map((x) => (x.id === m.id ? { ...x, ...patch } : x)))
                      setEditing(null)
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {isPending && <p className="text-xs text-cream/40 mt-4">Working…</p>}
    </div>
  )
}

function MediaEditForm({
  item,
  onSaved,
}: {
  item: Media
  onSaved: (patch: { title: string; alt: string; tags: string[] }) => void
}) {
  const [title, setTitle] = useState(item.title ?? "")
  const [alt, setAlt] = useState(item.alt ?? "")
  const [tags, setTags] = useState((item.tags ?? []).join(", "))
  const [saving, setSaving] = useState(false)

  return (
    <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="rounded bg-background border border-border px-2 py-1 text-xs text-cream outline-none focus:border-gold/60"
      />
      <input
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        placeholder="Alt text"
        className="rounded bg-background border border-border px-2 py-1 text-xs text-cream outline-none focus:border-gold/60"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="rounded bg-background border border-border px-2 py-1 text-xs text-cream outline-none focus:border-gold/60"
      />
      <button
        disabled={saving}
        onClick={async () => {
          setSaving(true)
          const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean)
          await updateMedia(item.id, { title, alt, tags: tagList })
          setSaving(false)
          onSaved({ title, alt, tags: tagList })
        }}
        className="rounded gold-gradient px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  )
}
