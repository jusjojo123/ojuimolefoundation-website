import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { getSession } from "@/lib/auth-helpers"
import { getConfig } from "@/lib/content-types"
import { getContentById } from "@/app/actions/content"
import { ContentForm } from "@/components/admin/content-form"
import { ArrowLeft } from "lucide-react"

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>
}) {
  const session = await getSession()
  if (!session?.user) redirect("/admin/login")

  const { type, id } = await params
  const config = getConfig(type)
  if (!config) notFound()

  const numericId = Number.parseInt(id, 10)
  if (Number.isNaN(numericId)) notFound()

  const item = await getContentById(numericId)
  if (!item || item.type !== config.type) notFound()

  return (
    <div>
      <Link
        href={`/admin/${config.type}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {config.plural.toLowerCase()}
      </Link>
      <h1 className="mb-6 font-heading text-2xl lg:text-3xl text-cream">Edit {config.label}</h1>
      <ContentForm config={config} item={item} />
    </div>
  )
}
