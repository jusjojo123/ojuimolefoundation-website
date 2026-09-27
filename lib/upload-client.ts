import { upload } from "@vercel/blob/client"

// Files are uploaded straight from the browser to Vercel Blob. /api/upload only
// issues a short-lived upload token after checking the admin session, so large
// videos never pass through a serverless function (whose request bodies are
// capped at ~4.5MB on Vercel). No completion callback is used, so this works
// the same in local dev, the v0 preview, and production.
export async function uploadFile(file: File): Promise<string> {
  const { url } = await uploadFileWithProgress(file)
  return url
}

export async function uploadFileWithProgress(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<{ url: string; pathname: string }> {
  const blob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/upload",
    contentType: file.type || undefined,
    multipart: file.size > 20 * 1024 * 1024,
    onUploadProgress: onProgress ? ({ percentage }) => onProgress(Math.round(percentage)) : undefined,
  })
  onProgress?.(100)
  return { url: blob.url, pathname: blob.pathname }
}

export const ACCEPT_MAP = {
  image: "image/jpeg,image/png,image/webp,image/gif,image/avif",
  video: "video/mp4,video/webm,video/quicktime,video/ogg",
  audio: "audio/mpeg,audio/wav,audio/ogg,audio/aac,audio/mp4,audio/x-m4a",
  document:
    "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain",
} as const

export type UploadKind = keyof typeof ACCEPT_MAP
