"use server"

import { put } from "@vercel/blob"
import { requireUserId } from "@/lib/auth-helpers"

/**
 * Uploads an image to Vercel Blob and returns its public URL.
 * Requires an authenticated admin session.
 */
export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    await requireUserId()
    const file = formData.get("file") as File | null
    if (!file || file.size === 0) {
      return { error: "No file provided" }
    }
    if (!file.type.startsWith("image/")) {
      return { error: "Please upload an image file" }
    }
    if (file.size > 8 * 1024 * 1024) {
      return { error: "Image must be under 8MB" }
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const blob = await put(`cms/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    })
    return { url: blob.url }
  } catch (error) {
    console.log("[v0] uploadImage error:", (error as Error).message)
    return { error: "Upload failed. Please try again." }
  }
}
