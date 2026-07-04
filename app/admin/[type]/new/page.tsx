import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { getSession } from "@/lib/auth-helpers"
import { getConfig } from "@/lib/content-types"
import { ContentForm } from "@/components/admin/content-form"
import { ArrowLeft } from "lucide-react"

export default async function NewContentPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const session = await getSession()
  if (!session?.user) redirect("/admin/login")

  const { type } = await params
  const config = getConfig(type)
  if (!config) notFound()

  return (
    <div>
      <Link
        href={`/admin/${config.type}`}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {config.plural.toLowerCase()}
      </Link>
      <h1 className="mb-6 font-heading text-2xl lg:text-3xl text-cream">Add {config.label}</h1>
      <ContentForm config={config} />
    </div>
  )
}
