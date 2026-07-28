import Link from "next/link"
import { requireUser } from "@/lib/auth-helpers"
import { getDashboardStats, listContent } from "@/app/actions/content"
import { ContentList } from "@/components/admin/content-list"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; status?: string; q?: string }>
}) {
  const user = await requireUser()
  const sp = await searchParams
  const filters = {
    type: sp.type ?? "all",
    status: sp.status ?? "all",
    q: sp.q ?? "",
  }

  const [stats, items] = await Promise.all([
    getDashboardStats(),
    listContent(filters),
  ])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-cream">Content Overview</h1>
          <p className="text-cream/50 text-sm mt-1">
            Manage articles, interviews, documentaries, news, events, projects, videos, and gallery photos.
          </p>
        </div>
        <Link
          href="/admin/dashboard/new"
          className="rounded-md gold-gradient text-primary-foreground font-medium tracking-wide px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          + New Content
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Published" value={stats.published} />
        <StatCard label="Drafts" value={stats.drafts} />
      </div>

      <ContentList items={items} role={user.role} filters={filters} />
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-card border border-border px-5 py-4">
      <p className="text-3xl font-heading gold-text-gradient">{value}</p>
      <p className="text-xs uppercase tracking-wider text-cream/50 mt-1">{label}</p>
    </div>
  )
}
