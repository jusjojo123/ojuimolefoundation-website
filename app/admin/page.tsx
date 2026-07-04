import Link from "next/link"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth-helpers"
import { db } from "@/lib/db"
import { contentItems } from "@/lib/db/schema"
import { CONTENT_TYPE_LIST } from "@/lib/content-types"
import { sql, eq, and } from "drizzle-orm"
import { ArrowRight } from "lucide-react"

export default async function AdminDashboardPage() {
  const session = await getSession()
  if (!session?.user) redirect("/admin/login")

  const rows = await db
    .select({
      type: contentItems.type,
      total: sql<number>`count(*)`,
      published: sql<number>`count(*) filter (where ${contentItems.published} = true)`,
    })
    .from(contentItems)
    .groupBy(contentItems.type)

  const counts = new Map(rows.map((r) => [r.type, { total: Number(r.total), published: Number(r.published) }]))

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-heading text-2xl lg:text-3xl text-cream">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Manage all your website content in one place.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {CONTENT_TYPE_LIST.map((cfg) => {
          const c = counts.get(cfg.type) ?? { total: 0, published: 0 }
          return (
            <Link
              key={cfg.type}
              href={`/admin/${cfg.type}`}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-gold"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-heading text-lg text-cream">{cfg.plural}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{cfg.description}</p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-gold" />
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="text-cream">
                  <span className="font-heading text-xl text-gold">{c.total}</span> total
                </span>
                <span className="text-muted-foreground">{c.published} published</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
