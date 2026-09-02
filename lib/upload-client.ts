// Shared client-side upload helper. Streams the file to our server route
// (/api/upload), which stores it in Vercel Blob and returns the public URL.
// This works identically in local dev, the v0 preview, and production.
export async function uploadFile(file: File): Promise<string> {
  const { url } = await uploadFileWithProgress(file)
  return url
}

// Uploads via XHR so we can report progress. Returns url and pathname.
export function uploadFileWithProgress(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<{ url: string; pathname: string }> {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.append("file", file)

    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/api/upload")

    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
      })
    }

    xhr.onload = () => {
      let data: { url?: string; pathname?: string; error?: string } = {}
      try {
        data = JSON.parse(xhr.responseText)
      } catch {
        // fall through to error handling below
      }
      if (xhr.status >= 200 && xhr.status < 300 && data.url) {
        onProgress?.(100)
        resolve({ url: data.url, pathname: data.pathname ?? "" })
      } else {
        reject(new Error(data.error || `Upload failed (${xhr.status})`))
      }
    }
    xhr.onerror = () => reject(new Error("Network error during upload"))
    xhr.send(form)
  })
}

export const ACCEPT_MAP = {
  image: "image/jpeg,image/png,image/webp,image/gif,image/avif",
  video: "video/mp4,video/webm,video/quicktime,video/ogg",
  audio: "audio/mpeg,audio/wav,audio/ogg,audio/aac,audio/mp4,audio/x-m4a",
  document:
    "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain",
} as const

export type UploadKind = keyof typeof ACCEPT_MAP
