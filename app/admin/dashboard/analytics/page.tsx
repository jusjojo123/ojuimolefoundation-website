import { redirect } from "next/navigation"
import Link from "next/link"
import { requireAdmin } from "@/lib/auth-helpers"
import { getAnalyticsSummary } from "@/lib/analytics"
import {
  StatCard,
  ViewsTrend,
  BarList,
  CountryList,
} from "@/components/admin/analytics-charts"

export const dynamic = "force-dynamic"

const RANGES = [
  { label: "7 days", value: 7 },
  { label: "30 days", value: 30 },
  { label: "90 days", value: 90 },
]

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const user = await requireAdmin().catch(() => null)
  if (!user) redirect("/admin")

  const { range } = await searchParams
  const days = RANGES.some((r) => String(r.value) === range) ? Number(range) : 30
  const data = await getAnalyticsSummary(days)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Analytics</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            First-party visitor data recorded on this site. No third-party tracking or estimated figures.
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
          {RANGES.map((r) => (
            <Link
              key={r.value}
              href={`/admin/dashboard/analytics?range=${r.value}`}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                r.value === days
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>

      {!data.hasData ? (
        <div className="rounded-lg border border-dashed border-border bg-card px-6 py-16 text-center">
          <h2 className="font-heading text-lg font-semibold text-foreground">No visits recorded yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Visitor data appears here as people browse the public website. Once traffic comes in, you&apos;ll see
            trends, top pages, sources, countries and devices for the selected period.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total page views" value={data.totalViews} />
            <StatCard label="Unique visitors" value={data.uniqueVisitors} />
            <StatCard
              label="Views / visitor"
              value={data.uniqueVisitors ? (data.totalViews / data.uniqueVisitors).toFixed(1) : "0"}
            />
            <StatCard label="Pages tracked" value={data.topPages.length} />
          </div>

          <ViewsTrend data={data.viewsByDay} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <BarList title="Top pages" items={data.topPages.map((p) => ({ label: p.path, views: p.views }))} />
            <BarList
              title="Traffic sources"
              items={data.topSources.map((s) => ({ label: s.source, views: s.views }))}
            />
            <CountryList data={data.topCountries} />
            <BarList
              title="Devices"
              items={data.devices.map((d) => ({ label: d.device, views: d.views }))}
            />
          </div>
        </>
      )}
    </div>
  )
}
