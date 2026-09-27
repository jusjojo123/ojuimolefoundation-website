import { handleUpload, type HandleUploadBody } from "@vercel/blob/client"
import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]
const VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"]
const AUDIO_TYPES = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/webm", "audio/aac", "audio/x-m4a", "audio/mp4"]
const DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
]

const MAX_BYTES = 500 * 1024 * 1024 // 500MB

export const runtime = "nodejs"

// Issues client-upload tokens to signed-in admins/editors only. The browser
// then uploads the file bytes directly to Vercel Blob.
export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = (await request.json()) as HandleUploadBody
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [...IMAGE_TYPES, ...VIDEO_TYPES, ...AUDIO_TYPES, ...DOCUMENT_TYPES],
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: true,
      }),
    })
    return NextResponse.json(result)
  } catch (error) {
    console.log("[v0] upload token error:", error)
    const message = error instanceof Error ? error.message : "Upload failed"
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
