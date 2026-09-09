import { requireUser } from "@/lib/auth-helpers"
import { ContentEditor } from "@/components/admin/content-editor"
import type { ContentType } from "@/lib/content-config"

export default async function NewContentPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const user = await requireUser()
  const sp = await searchParams

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl text-cream">Create Content</h1>
        <p className="text-cream/50 text-sm mt-1">
          Fill in the details, then save as a draft or publish immediately.
        </p>
      </div>
      <ContentEditor defaultType={(sp.type as ContentType) ?? undefined} canPublish={user.canPublish} />
    </div>
  )
}
