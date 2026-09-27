"use client"

import { useRef, useState } from "react"
import { uploadFileWithProgress, ACCEPT_MAP, type UploadKind } from "@/lib/upload-client"
import { saveMedia } from "@/app/actions/media"
import { MediaPicker } from "@/components/edit/media-picker"

type Props = {
  accept: UploadKind
  onUploaded: (url: string) => void
  label?: string
  /** When true, also register the upload in the shared media library. */
  addToLibrary?: boolean
  /** When true, show a "Choose from Media Library" button next to the upload button. */
  showLibrary?: boolean
}

export function MediaUploader({ accept, onUploaded, label, addToLibrary = true, showLibrary = true }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadPct, setUploadPct] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const uploading = uploadPct !== null

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploadPct(0)

    try {
      const { url, pathname } = await uploadFileWithProgress(file, setUploadPct)
      onUploaded(url)
      if (addToLibrary) {
        await saveMedia({
          url,
          pathname,
          kind: accept,
          filename: file.name,
          title: file.name.replace(/\.[^.]+$/, ""),
          contentType: file.type,
          size: file.size,
        }).catch((err) => console.log("[v0] saveMedia error:", err))
      }
    } catch (err) {
      console.log("[v0] upload client error:", err)
      setError(err instanceof Error && err.message ? `Upload failed: ${err.message}` : "Upload failed. Please try again.")
    } finally {
      setUploadPct(null)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-md border border-gold/40 text-gold px-4 py-2 text-sm hover:bg-gold/10 transition-colors disabled:opacity-50"
        >
          {uploading ? `Uploading ${uploadPct}%…` : label ?? `Upload ${accept}`}
        </button>
        {showLibrary && (
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-md border border-border text-cream/80 px-4 py-2 text-sm hover:border-gold/40 hover:text-cream transition-colors disabled:opacity-50"
          >
            Choose from Media Library
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_MAP[accept]}
        onChange={handleChange}
        className="hidden"
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
      {showLibrary && (
        <MediaPicker
          open={pickerOpen}
          kind={accept}
          onClose={() => setPickerOpen(false)}
          onSelect={(url) => {
            onUploaded(url)
            setPickerOpen(false)
          }}
        />
      )}
    </div>
  )
}
