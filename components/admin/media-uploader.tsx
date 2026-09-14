"use client"

import { useRef, useState } from "react"
import { uploadFile, ACCEPT_MAP, type UploadKind } from "@/lib/upload-client"
import { saveMedia } from "@/app/actions/media"

type Props = {
  accept: UploadKind
  onUploaded: (url: string) => void
  label?: string
  /** When true, also register the upload in the shared media library. */
  addToLibrary?: boolean
}

export function MediaUploader({ accept, onUploaded, label, addToLibrary = true }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)

    try {
      const url = await uploadFile(file)
      onUploaded(url)
      if (addToLibrary) {
        // Fire-and-forget: registering in the library shouldn't block the form.
        saveMedia({
          url,
          kind: accept,
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }).catch((err) => console.log("[v0] saveMedia error:", err))
      }
    } catch (err) {
      console.log("[v0] upload client error:", err)
      setError("Upload failed. Please try again.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 self-start rounded-md border border-gold/40 text-gold px-4 py-2 text-sm hover:bg-gold/10 transition-colors disabled:opacity-50"
      >
        {uploading ? "Uploading…" : label ?? `Upload ${accept}`}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_MAP[accept]}
        onChange={handleChange}
        className="hidden"
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  )
}
