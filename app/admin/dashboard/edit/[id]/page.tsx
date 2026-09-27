import { notFound } from "next/navigation"
import { requireUser } from "@/lib/auth-helpers"
import { getContentById } from "@/app/actions/content"
import { ContentEditor } from "@/components/admin/content-editor"

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await requireUser()
  const { id } = await params
  const numId = Number(id)
  if (Number.isNaN(numId)) notFound()

  const item = await getContentById(numId)
  if (!item) notFound()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl text-cream">Edit Content</h1>
        <p className="text-cream/50 text-sm mt-1">Update the details below.</p>
      </div>
      <ContentEditor initial={item} canPublish={user.canPublish} />
    </div>
  )
}
