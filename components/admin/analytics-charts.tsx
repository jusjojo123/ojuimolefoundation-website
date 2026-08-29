import type { AnalyticsSummary } from "@/lib/analytics"

const COUNTRY_NAMES: Record<string, string> = {
  TT: "Trinidad & Tobago",
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  NG: "Nigeria",
  JM: "Jamaica",
  BB: "Barbados",
  GY: "Guyana",
  BR: "Brazil",
  FR: "France",
  DE: "Germany",
  IN: "India",
  ZA: "South Africa",
  Unknown: "Unknown",
}

function countryLabel(code: string): string {
  return COUNTRY_NAMES[code] ?? code
}

/** Single headline metric card. */
export function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-gold/10 bg-background/40 p-5">
      <p className="text-sm text-cream/50">{label}</p>
      <p className="mt-2 font-heading text-3xl text-cream tabular-nums">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    </div>
  )
}

/** Framed daily-views trend chart with a heading. */
export function ViewsTrend({ data }: { data: { date: string; views: number }[] }) {
  return (
    <div className="rounded-xl border border-gold/10 bg-background/40 p-5">
      <h3 className="font-heading text-lg text-cream mb-4">Page views over time</h3>
      <ViewsSparkline data={data} />
    </div>
  )
}

/** Data-driven line chart built from real daily view counts. */
export function ViewsSparkline({ data }: { data: { date: string; views: number }[] }) {
  if (data.length === 0) return null
  const w = 720
  const h = 180
  const pad = 8
  const max = Math.max(1, ...data.map((d) => d.views))
  const stepX = (w - pad * 2) / Math.max(1, data.length - 1)
  const points = data.map((d, i) => {
    const x = pad + i * stepX
    const y = h - pad - (d.views / max) * (h - pad * 2)
    return [x, y] as const
  })
  const line = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  const area = `${pad},${h - pad} ${line} ${(w - pad).toFixed(1)},${h - pad}`

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-auto"
        role="img"
        aria-label="Daily page views over the selected period"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill="url(#viewsFill)" />
        <polyline
          points={line}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="flex justify-between text-[10px] text-cream/40 mt-1">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </div>
  )
}

/** Horizontal bar list for breakdowns (pages, sources, countries, devices). */
export function BarList({
  title,
  items,
  labelFor,
}: {
  title: string
  items: { label: string; views: number }[]
  labelFor?: (label: string) => string
}) {
  const max = Math.max(1, ...items.map((i) => i.views))
  return (
    <div className="rounded-xl border border-gold/10 bg-background/40 p-5">
      <h3 className="font-heading text-lg text-cream mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-cream/40">No data yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="truncate text-cream/80 pr-2">
                  {labelFor ? labelFor(item.label) : item.label}
                </span>
                <span className="shrink-0 text-cream/50 tabular-nums">{item.views}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gold/70"
                  style={{ width: `${(item.views / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { countryLabel }

/** Renders the country breakdown with friendly names. */
export function CountryList({ data }: { data: AnalyticsSummary["topCountries"] }) {
  return (
    <BarList
      title="Top Countries"
      items={data.map((c) => ({ label: c.country, views: c.views }))}
      labelFor={countryLabel}
    />
  )
}
