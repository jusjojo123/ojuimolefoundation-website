import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { pageview } from "@/lib/db/schema"

// First-party, cookieless page-view tracking. Records only a coarse path,
// referrer source, geo country (from the edge), and a device class. No IP
// address or personal data is stored. Admin paths are never recorded.

function classifyDevice(ua: string): string {
  const s = ua.toLowerCase()
  if (/tablet|ipad|playbook|silk/.test(s)) return "tablet"
  if (/mobi|android|iphone|ipod|phone/.test(s)) return "mobile"
  return "desktop"
}

function sourceFromReferrer(ref: string | null, host: string | null): string {
  if (!ref) return "direct"
  try {
    const u = new URL(ref)
    if (host && u.hostname === host) return "internal"
    const h = u.hostname.replace(/^www\./, "")
    if (/google\./.test(h)) return "google"
    if (/bing\./.test(h)) return "bing"
    if (/facebook\.|fb\./.test(h)) return "facebook"
    if (/instagram\./.test(h)) return "instagram"
    if (/t\.co|twitter\.|x\.com/.test(h)) return "twitter/x"
    if (/tiktok\./.test(h)) return "tiktok"
    if (/linkedin\./.test(h)) return "linkedin"
    if (/youtube\.|youtu\.be/.test(h)) return "youtube"
    return h
  } catch {
    return "other"
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    let path: string = typeof body?.path === "string" ? body.path : "/"
    // Keep path clean and bounded; strip query/hash.
    path = path.split("?")[0].split("#")[0].slice(0, 300) || "/"
    // Never record admin, api, or auth traffic.
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const sessionId: string | null =
      typeof body?.sessionId === "string" ? body.sessionId.slice(0, 64) : null

    const h = request.headers
    const ua = h.get("user-agent") ?? ""
    const referrer = h.get("referer")
    const host = h.get("host")
    const country =
      h.get("x-vercel-ip-country") || h.get("cf-ipcountry") || null

    await db.insert(pageview).values({
      path,
      referrer: referrer?.slice(0, 300) ?? null,
      source: sourceFromReferrer(referrer, host),
      country: country ? country.slice(0, 4) : null,
      device: classifyDevice(ua),
      sessionId,
    })

    return NextResponse.json({ ok: true })
  } catch {
    // Analytics must never break the site.
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
