import { BetaAnalyticsDataClient } from "@google-analytics/data"

function normalizeKey(raw) {
  let k = (raw || "").trim()
  // strip surrounding quotes if present
  if ((k.startsWith('"') && k.endsWith('"')) || (k.startsWith("'") && k.endsWith("'"))) {
    k = k.slice(1, -1)
  }
  // convert escaped newlines to real newlines
  k = k.replace(/\\n/g, "\n")
  return k
}

const raw = process.env.PRIVATE_KEY || ""
const key = normalizeKey(raw)

console.log("[v0] raw len:", raw.length)
console.log("[v0] normalized len:", key.length)
console.log("[v0] starts:", JSON.stringify(key.slice(0, 28)))
console.log("[v0] ends:", JSON.stringify(key.slice(-28)))
console.log("[v0] real newline count:", (key.match(/\n/g) || []).length)

const propertyId = (process.env.GA4_PROPERTY_ID || "").replace(/\D/g, "")

try {
  const client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA4_CLIENT_EMAIL,
      private_key: key,
    },
  })
  const [res] = await client.runReport({
    property: "properties/" + propertyId,
    dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
    metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
  })
  const totals = res.totals?.[0]?.metricValues || []
  console.log("[v0] SUCCESS - page views:", totals[0]?.value ?? "n/a", "| active users:", totals[1]?.value ?? "n/a")
} catch (e) {
  console.error("[v0] GA4 ERROR:", e.message)
}
