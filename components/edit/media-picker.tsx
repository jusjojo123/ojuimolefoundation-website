"use client"

import { useEffect, useRef, useState } from "react"
import { listMedia, saveMedia } from "@/app/actions/media"
import { uploadFileWithProgress } from "@/lib/upload-client"

type MediaRow = {
  id: number
  url: string
  title: string | null
  alt: string | null
  kind: string
}

export function MediaPicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean
  onClose: () => void
  onSelect: (url: string) => void
}) {
  const [items, setItems] = useState<MediaRow[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [uploadPct, setUploadPct] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    listMedia({ kind: "image", search })
      .then((rows) => setItems(rows as MediaRow[]))
      .catch(() => setError("Could not load media."))
      .finally(() => setLoading(false))
  }, [open, search])

  if (!open) return null

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.")
      return
    }
    try {
      setUploadPct(0)
      const { url, pathname } = await uploadFileWithProgress(file, setUploadPct)
      await saveMedia({
        url,
        pathname,
        kind: "image",
        filename: file.name,
        contentType: file.type,
        size: file.size,
      })
      setUploadPct(null)
      onSelect(url)
    } catch {
      setError("Upload failed. Please try again.")
      setUploadPct(null)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Choose an image"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#12100e] border border-gold/30 rounded-xl shadow-2xl max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gold/15">
          <h2 className="font-heading text-lg text-gold tracking-wide">Media Library</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-cream/50 hover:text-cream text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 px-5 py-3 border-b border-gold/10">
          <input
            type="search"
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded bg-background border border-gold/20 px-3 py-2 text-sm text-cream outline-none focus:border-gold/60"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="px-4 py-2 rounded bg-gold/15 text-gold text-xs uppercase tracking-wider hover:bg-gold/25 transition-colors whitespace-nowrap"
          >
            {uploadPct === null ? "Upload new" : `Uploading ${uploadPct}%`}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>

        {error ? <p className="px-5 pt-3 text-sm text-red-400">{error}</p> : null}

        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <p className="text-cream/40 text-center py-10">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-cream/40 text-center py-10">
              No images yet. Upload one to get started.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {items.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onSelect(m.url)}
                  className="group relative aspect-square rounded overflow-hidden border border-gold/15 hover:border-gold focus:border-gold outline-none transition-colors"
                  title={m.title || m.alt || "Select image"}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.url || "/placeholder.svg"}
                    alt={m.alt || m.title || ""}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
