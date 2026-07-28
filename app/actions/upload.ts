"use server"

import { put } from "@vercel/blob"
import { getCurrentUser } from "@/lib/auth-helpers"

const MAX_IMAGE = 15 * 1024 * 1024 // 15MB
const MAX_VIDEO = 200 * 1024 * 1024 // 200MB

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/ogg"]

export type UploadResult = { url: string; error?: never } | { url?: never; error: string }

/**
 * Uploads a single file to Vercel Blob. Only authenticated admins/editors may
 * upload. Returns the public blob URL.
 */
export async function uploadFile(formData: FormData): Promise<UploadResult> {
  const user = await getCurrentUser()
  if (!user) return { error: "Unauthorized" }

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file provided." }
  }

  const isImage = IMAGE_TYPES.includes(file.type)
  const isVideo = VIDEO_TYPES.includes(file.type)

  if (!isImage && !isVideo) {
    return { error: "Unsupported file type. Upload an image or video." }
  }
  if (isImage && file.size > MAX_IMAGE) {
    return { error: "Image is too large (max 15MB)." }
  }
  if (isVideo && file.size > MAX_VIDEO) {
    return { error: "Video is too large (max 200MB)." }
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase()
  const folder = isVideo ? "videos" : "images"

  try {
    const blob = await put(`cms/${folder}/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    })
    return { url: blob.url }
  } catch (err) {
    console.log("[v0] blob upload failed:", err)
    return { error: "Upload failed. Please try again." }
  }
}
