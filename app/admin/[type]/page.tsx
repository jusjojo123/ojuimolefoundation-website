import { notFound, redirect } from "next/navigation"
import { getSession } from "@/lib/auth-helpers"
import { getConfig } from "@/lib/content-types"
import { getAllContent, type ContentType } from "@/app/actions/content"
import { ContentList } from "@/components/admin/content-list"

export default async function AdminTypeListPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const session = await getSession()
  if (!session?.user) redirect("/admin/login")

  const { type } = await params
  const config = getConfig(type)
  if (!config) notFound()

  const items = await getAllContent(type as ContentType)
  return <ContentList config={config} items={items} />
}
