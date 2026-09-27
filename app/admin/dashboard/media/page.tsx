import { requireUser } from "@/lib/auth-helpers"
import { listMedia } from "@/app/actions/media"
import { MediaLibrary } from "@/components/admin/media-library"
import { PublishingGuide } from "@/components/admin/publishing-guide"

export const dynamic = "force-dynamic"

export default async function MediaPage() {
  const user = await requireUser()
  const items = await listMedia()
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl text-gold tracking-wide">Media Library</h1>
        <p className="text-sm text-cream/50 mt-1">
          Upload, tag, search, and reuse images, video, audio, and documents across the site.
        </p>
      </div>
      <div className="mb-6">
        <PublishingGuide note="Uploading a file here stores it in your library only. It does not appear on the public website until you attach it to content and publish." />
      </div>
      <MediaLibrary
        initialItems={items}
        canDelete={user.role === "admin" || user.canDelete}
      />
    </div>
  )
}
