"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { uploadImage } from "@/app/actions/upload"
import { Upload, X } from "lucide-react"

export function ImageUploader({
  name,
  defaultValue,
  label = "Image",
}: {
  name: string
  defaultValue?: string | null
  label?: string
}) {
  const [url, setUrl] = useState(defaultValue ?? "")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    const fd = new FormData()
    fd.append("file", file)
    const result = await uploadImage(fd)
    setUploading(false)
    if (result.error) {
      setError(result.error)
      return
    }
    if (result.url) setUrl(result.url)
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-cream/80">{label}</span>
      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="relative w-full max-w-xs overflow-hidden rounded-lg border border-border">
          <Image
            src={url || "/placeholder.svg"}
            alt="Uploaded preview"
            width={320}
            height={200}
            className="h-40 w-full object-cover"
          />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-cream hover:bg-background"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-40 w-full max-w-xs flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted text-muted-foreground transition-colors hover:border-gold hover:text-cream disabled:opacity-50"
        >
          <Upload className="h-6 w-6" />
          <span className="text-sm">{uploading ? "Uploading..." : "Click to upload"}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}
