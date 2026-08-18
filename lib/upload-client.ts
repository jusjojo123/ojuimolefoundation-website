import { upload } from "@vercel/blob/client"

// Shared client-side upload helper. Uploads file bytes directly to Vercel Blob
// via the token-exchange route at /api/upload, then returns the public URL.
export async function uploadFile(file: File): Promise<string> {
  const blob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/upload",
  })
  return blob.url
}

export const ACCEPT_MAP = {
  image: "image/jpeg,image/png,image/webp,image/gif,image/avif",
  video: "video/mp4,video/webm,video/quicktime,video/ogg",
  audio: "audio/mpeg,audio/wav,audio/ogg,audio/aac,audio/mp4,audio/x-m4a",
  document:
    "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain",
} as const

export type UploadKind = keyof typeof ACCEPT_MAP
