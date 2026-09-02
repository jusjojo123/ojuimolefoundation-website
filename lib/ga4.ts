import "server-only"
import { BetaAnalyticsDataClient } from "@google-analytics/data"

export type Ga4Summary = {
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

export type Ga4Response =
  | { status: "not_configured" }
  | { status: "error"; message: string }
  | { status: "ok"; data: Ga4Summary }

type Ga4Credentials = {
  clientEmail: string
  privateKey: string
  propertyId: string
}

function stripWrappingQuotes(value: string): string {
  const v = value.trim()
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1)
  }
  return v
}

function normalizePrivateKey(raw: string): string {
  // Env vars store the key with literal "\n"; convert back to real newlines.
  return stripWrappingQuotes(raw).replace(/\\n/g, "\n").trim()
}

/**
 * Resolve GA4 credentials. Preferred source is a full service-account JSON blob
 * in GA4_CREDENTIALS_JSON (paste the entire key file — nothing to hand-copy, so
 * it can't be corrupted). Falls back to the individual GA4_CLIENT_EMAIL and
 * GA4_PRIVATE_KEY fields. The numeric property ID always comes from
 * GA4_PROPERTY_ID (or the JSON if it carries one).
 */
/**
 * Parse a service-account JSON blob tolerantly. Handles the common paste
 * mistakes: outer braces dropped, the whole thing wrapped in extra quotes, or
 * leading/trailing whitespace. Returns the two fields we need, or null.
 */
function parseServiceAccountBlob(
  raw: string,
): { clientEmail: string; privateKey: string } | null {
  let text = raw.trim()

  // Strip one layer of accidental wrapping quotes.
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
    text = text.slice(1, -1).trim()
  }

  // Preferred, corruption-proof form: the whole JSON file base64-encoded.
  // A base64 blob has no braces/quotes/newlines to mangle on paste.
  if (!text.startsWith("{") && /^[A-Za-z0-9+/=\s]+$/.test(text) && text.length > 100) {
    try {
      const decoded = Buffer.from(text.replace(/\s/g, ""), "base64").toString("utf8")
      if (decoded.includes("private_key")) {
        text = decoded.trim()
      }
    } catch {
      // Not valid base64 — continue with the raw text.
    }
  }

  // Re-add outer braces if they were dropped during paste.
  if (!text.startsWith("{")) text = `{${text}`
  if (!text.endsWith("}")) text = `${text}}`

  const tryParse = (s: string) => {
    try {
      return JSON.parse(s) as Record<string, unknown>
    } catch {
      return null
    }
  }

  let parsed = tryParse(text)

  // Fallback: pull the two fields directly with regex if JSON is still invalid.
  if (!parsed) {
    const emailMatch = text.match(/"client_email"\s*:\s*"([^"]+)"/)
    const keyMatch = text.match(/"private_key"\s*:\s*"((?:\\.|[^"\\])*)"/)
    if (emailMatch && keyMatch) {
      parsed = { client_email: emailMatch[1], private_key: keyMatch[1] }
    }
  }

  if (!parsed) return null

  const clientEmail = typeof parsed.client_email === "string" ? parsed.client_email : ""
  const privateKey = normalizePrivateKey(
    typeof parsed.private_key === "string" ? parsed.private_key : "",
  )
  if (!clientEmail || !privateKey) return null
  return { clientEmail, privateKey }
}

function resolveCredentials(): Ga4Credentials | null {
  const propertyId = (process.env.GA4_PROPERTY_ID ?? "").replace(/\D/g, "")

  const jsonBlob = process.env.GA4_CREDENTIALS_JSON
  if (jsonBlob && jsonBlob.trim()) {
    const fromJson = parseServiceAccountBlob(jsonBlob)
    if (fromJson && propertyId) {
      return { ...fromJson, propertyId }
    }
  }

  const clientEmail = process.env.GA4_CLIENT_EMAIL ?? ""
  const privateKey = normalizePrivateKey(process.env.GA4_PRIVATE_KEY ?? "")
  if (clientEmail && privateKey && propertyId) {
    return { clientEmail, privateKey, propertyId }
  }

  return null
}

/** True only when a usable set of GA4 Data API credentials is present. */
export function isGa4Configured(): boolean {
  return resolveCredentials() !== null
}

let cachedClient: BetaAnalyticsDataClient | null = null
function getClient(creds: Ga4Credentials): BetaAnalyticsDataClient {
  if (cachedClient) return cachedClient
  cachedClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: creds.clientEmail,
      private_key: creds.privateKey,
    },
  })
  return cachedClient
}

// GA4 returns the `date` dimension as YYYYMMDD.
function toIsoDate(ga: string): string {
  if (ga.length !== 8) return ga
  return `${ga.slice(0, 4)}-${ga.slice(4, 6)}-${ga.slice(6, 8)}`
}

function num(v: string | null | undefined): number {
  const n = Number(v ?? 0)
  return Number.isFinite(n) ? n : 0
}

/**
 * Fetch real statistics from the Google Analytics 4 Data API for the last
 * `days` days. All figures come straight from GA4 — nothing is estimated or
 * fabricated. Returns a typed status so the UI can show setup or error states
 * instead of fake numbers.
 */
export async function getGa4Summary(days = 30): Promise<Ga4Response> {
  const creds = resolveCredentials()
  if (!creds) return { status: "not_configured" }

  const property = `properties/${creds.propertyId}`
  const dateRanges = [{ startDate: `${days - 1}daysAgo`, endDate: "today" }]

  try {
    const client = getClient(creds)

    const [byDay, pages, sources, countries, devices, totals] = await Promise.all([
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "date" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "sessionSource" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 8,
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "country" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 8,
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "deviceCategory" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      }),
      client.runReport({
        property,
        dateRanges,
        metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }],
      }),
    ])

    const totalRow = totals[0].rows?.[0]
    const totalViews = num(totalRow?.metricValues?.[0]?.value)
    const uniqueVisitors = num(totalRow?.metricValues?.[1]?.value)

    // Build a gap-filled per-day series.
    const dayMap = new Map<string, number>()
    for (const row of byDay[0].rows ?? []) {
      const key = toIsoDate(row.dimensionValues?.[0]?.value ?? "")
      dayMap.set(key, num(row.metricValues?.[0]?.value))
    }
    const since = new Date()
    since.setDate(since.getDate() - (days - 1))
    const viewsByDay: { date: string; views: number }[] = []
    for (let i = 0; i < days; i++) {
      const d = new Date(since)
      d.setDate(since.getDate() + i)
      const key = d.toISOString().slice(0, 10)
      viewsByDay.push({ date: key, views: dayMap.get(key) ?? 0 })
    }

    const topPages = (pages[0].rows ?? []).map((r) => ({
      path: r.dimensionValues?.[0]?.value ?? "(unknown)",
      views: num(r.metricValues?.[0]?.value),
    }))
    const topSources = (sources[0].rows ?? []).map((r) => ({
      source: r.dimensionValues?.[0]?.value || "direct",
      views: num(r.metricValues?.[0]?.value),
    }))
    const topCountries = (countries[0].rows ?? []).map((r) => ({
      country: r.dimensionValues?.[0]?.value || "Unknown",
      views: num(r.metricValues?.[0]?.value),
    }))
    const deviceList = (devices[0].rows ?? []).map((r) => ({
      device: r.dimensionValues?.[0]?.value || "unknown",
      views: num(r.metricValues?.[0]?.value),
    }))

    return {
      status: "ok",
      data: {
        days,
        totalViews,
        uniqueVisitors,
        viewsByDay,
        topPages,
        topSources,
        topCountries,
        devices: deviceList,
        hasData: totalViews > 0,
      },
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown GA4 error"
    console.log("[v0] getGa4Summary failed:", message)
    // Surface a concise, actionable message; hide noisy internals.
    let friendly = message
    if (/permission|PERMISSION_DENIED|403/i.test(message)) {
      friendly =
        "GA4 denied access. Add the service account email as a Viewer on your GA4 property, and confirm the Property ID."
    } else if (/invalid_grant|invalid.*key|DECODER|PEM/i.test(message)) {
      friendly =
        "The service account private key looks invalid. Re-copy GA4_PRIVATE_KEY exactly, including the BEGIN/END lines."
    } else if (/NOT_FOUND|404/i.test(message)) {
      friendly = "GA4 property not found. Check that GA4_PROPERTY_ID is the numeric property ID."
    }
    return { status: "error", message: friendly }
  }
}
