"use client"

import { useEffect, useRef, useState } from "react"
import { listMedia, saveMedia } from "@/app/actions/media"
import { uploadFileWithProgress, ACCEPT_MAP, type UploadKind } from "@/lib/upload-client"

type MediaRow = {
  id: number
  url: string
  title: string | null
  filename: string | null
  alt: string | null
  kind: string
}

const KIND_LABEL: Record<UploadKind, { singular: string; plural: string }> = {
  image: { singular: "image", plural: "images" },
  video: { singular: "video", plural: "videos" },
  audio: { singular: "audio file", plural: "audio files" },
  document: { singular: "document", plural: "documents" },
}

export function MediaPicker({
  open,
  onClose,
  onSelect,
  kind = "image",
}: {
  open: boolean
  onClose: () => void
  onSelect: (url: string) => void
  kind?: UploadKind
}) {
  const [items, setItems] = useState<MediaRow[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [uploadPct, setUploadPct] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const label = KIND_LABEL[kind]

  useEffect(() => {
    if (!open) return
    setLoading(true)
    listMedia({ kind, search })
      .then((rows) => setItems(rows as MediaRow[]))
      .catch(() => setError("Could not load media."))
      .finally(() => setLoading(false))
  }, [open, search, kind])

  if (!open) return null

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    try {
      setUploadPct(0)
      const { url, pathname } = await uploadFileWithProgress(file, setUploadPct)
      await saveMedia({
        url,
        pathname,
        kind,
        filename: file.name,
        title: file.name.replace(/\.[^.]+$/, ""),
        contentType: file.type,
        size: file.size,
      })
      setUploadPct(null)
      onSelect(url)
    } catch (err) {
      console.log("[v0] picker upload error:", err)
      setError("Upload failed. Please try again.")
      setUploadPct(null)
    } finally {
      if (fileRef.current) fileRef.current.value = ""
    }
  }

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Choose ${label.singular === "audio file" ? "an audio file" : `a ${label.singular}`}`}
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
            placeholder={`Search ${label.plural}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded bg-background border border-gold/20 px-3 py-2 text-sm text-cream outline-none focus:border-gold/60"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploadPct !== null}
            className="px-4 py-2 rounded bg-gold/15 text-gold text-xs uppercase tracking-wider hover:bg-gold/25 transition-colors whitespace-nowrap disabled:opacity-60"
          >
            {uploadPct === null ? "Upload new" : `Uploading ${uploadPct}%`}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept={ACCEPT_MAP[kind]}
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
              No {label.plural} in the library yet. Upload one to get started.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {items.map((m) => {
                const name = m.title || m.filename || "Untitled"
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onSelect(m.url)}
                    className="group flex flex-col rounded overflow-hidden border border-gold/15 hover:border-gold focus:border-gold outline-none transition-colors text-left"
                    title={`Use ${name}`}
                  >
                    <span className="relative block aspect-square bg-background">
                      {kind === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={m.url || "/placeholder.svg"}
                          alt={m.alt || m.title || ""}
                          className="w-full h-full object-cover"
                        />
                      ) : kind === "video" ? (
                        <video
                          src={`${m.url}#t=0.5`}
                          muted
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wider text-cream/40">
                          {kind}
                        </span>
                      )}
                      <span className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors" />
                    </span>
                    <span className="truncate px-2 py-1.5 text-[11px] text-cream/70">{name}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
