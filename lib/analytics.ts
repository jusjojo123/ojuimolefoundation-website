import "server-only"
import { db } from "@/lib/db"
import { pageview } from "@/lib/db/schema"
import { and, gte, sql } from "drizzle-orm"

export type AnalyticsSummary = {
  days: number
  totalViews: number
  uniqueVisitors: number
  viewsByDay: { date: string; views: number }[]
  topPages: { path: string; views: number }[]
  topSources: { source: string; views: number }[]
  topCountries: { country: string; views: number }[]
  devices: { device: string; views: number }[]
  hasData: boolean
}

/**
 * Aggregate first-party analytics for the last `days` days. All numbers are
 * derived from real recorded page views — nothing is fabricated. Returns
 * zeroed structures (hasData: false) when no views have been recorded yet.
 */
export async function getAnalyticsSummary(days = 30): Promise<AnalyticsSummary> {
  const since = new Date()
  since.setDate(since.getDate() - (days - 1))
  since.setHours(0, 0, 0, 0)

  const empty: AnalyticsSummary = {
    days,
    totalViews: 0,
    uniqueVisitors: 0,
    viewsByDay: [],
    topPages: [],
    topSources: [],
    topCountries: [],
    devices: [],
    hasData: false,
  }

  try {
    const where = and(gte(pageview.createdAt, since))

    const [totals] = await db
      .select({
        total: sql<number>`count(*)::int`,
        uniques: sql<number>`count(distinct ${pageview.sessionId})::int`,
      })
      .from(pageview)
      .where(where)

    const totalViews = totals?.total ?? 0
    if (totalViews === 0) return empty

    const byDayRows = await db
      .select({
        date: sql<string>`to_char(date_trunc('day', ${pageview.createdAt}), 'YYYY-MM-DD')`,
        views: sql<number>`count(*)::int`,
      })
      .from(pageview)
      .where(where)
      .groupBy(sql`date_trunc('day', ${pageview.createdAt})`)
      .orderBy(sql`date_trunc('day', ${pageview.createdAt})`)

    // Fill gaps so the chart has one point per day.
    const dayMap = new Map(byDayRows.map((r) => [r.date, r.views]))
    const viewsByDay: { date: string; views: number }[] = []
    for (let i = 0; i < days; i++) {
      const d = new Date(since)
      d.setDate(since.getDate() + i)
      const key = d.toISOString().slice(0, 10)
      viewsByDay.push({ date: key, views: dayMap.get(key) ?? 0 })
    }

    const topPages = await db
      .select({ path: pageview.path, views: sql<number>`count(*)::int` })
      .from(pageview)
      .where(where)
      .groupBy(pageview.path)
      .orderBy(sql`count(*) desc`)
      .limit(10)

    const topSources = await db
      .select({
        source: sql<string>`coalesce(${pageview.source}, 'direct')`,
        views: sql<number>`count(*)::int`,
      })
      .from(pageview)
      .where(where)
      .groupBy(pageview.source)
      .orderBy(sql`count(*) desc`)
      .limit(8)

    const topCountries = await db
      .select({
        country: sql<string>`coalesce(${pageview.country}, 'Unknown')`,
        views: sql<number>`count(*)::int`,
      })
      .from(pageview)
      .where(where)
      .groupBy(pageview.country)
      .orderBy(sql`count(*) desc`)
      .limit(8)

    const devices = await db
      .select({
        device: sql<string>`coalesce(${pageview.device}, 'unknown')`,
        views: sql<number>`count(*)::int`,
      })
      .from(pageview)
      .where(where)
      .groupBy(pageview.device)
      .orderBy(sql`count(*) desc`)

    return {
      days,
      totalViews,
      uniqueVisitors: totals?.uniques ?? 0,
      viewsByDay,
      topPages,
      topSources,
      topCountries,
      devices,
      hasData: true,
    }
  } catch (err) {
    console.log("[v0] getAnalyticsSummary failed:", err)
    return empty
  }
}
