import { requireUser } from "@/lib/auth-helpers"
import { getDashboardStats, listContent } from "@/app/actions/content"
import { ContentList } from "@/components/admin/content-list"
import { AddNewMenu } from "@/components/admin/add-new-menu"

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
            Manage every kind of content across the Foundation website.
          </p>
        </div>
        <AddNewMenu />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Published" value={stats.published} />
        <StatCard label="Drafts" value={stats.drafts} />
        <StatCard label="Archived" value={stats.archived} />
      </div>

      <ContentList
        items={items}
        role={user.role}
        canPublish={user.canPublish}
        canDelete={user.canDelete}
        filters={filters}
      />
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
