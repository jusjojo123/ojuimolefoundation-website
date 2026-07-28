import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"]

// Client-side upload token exchange. The browser uploads the file bytes
// directly to Vercel Blob; only small JSON requests pass through this route,
// which avoids proxy/body-size limits on large images and videos.
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Only authenticated admins/editors may obtain an upload token.
        const session = await auth.api.getSession({ headers: await headers() })
        if (!session?.user) {
          throw new Error("Unauthorized")
        }
        return {
          allowedContentTypes: [...IMAGE_TYPES, ...VIDEO_TYPES],
          addRandomSuffix: true,
          maximumSizeInBytes: 200 * 1024 * 1024, // 200MB
        }
      },
      onUploadCompleted: async () => {
        // No-op: the client receives the blob URL directly.
      },
    })
    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.log("[v0] upload token error:", error)
    const message = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
