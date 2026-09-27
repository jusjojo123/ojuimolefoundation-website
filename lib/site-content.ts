import "server-only"
import { cache } from "react"
import { db } from "@/lib/db"
import { siteContent } from "@/lib/db/schema"

/**
 * Loads all site-content overrides once per request (React cache dedupes
 * repeated calls across the many homepage sections). Returns a plain map of
 * key -> stored value. Components resolve their own hardcoded default when a
 * key is absent, so the public site is unchanged until an editor overrides it.
 */
export const getSiteContentMap = cache(async (): Promise<Record<string, string>> => {
  try {
    const rows = await db
      .select({ key: siteContent.key, value: siteContent.value })
      .from(siteContent)
    const map: Record<string, string> = {}
    for (const r of rows) map[r.key] = r.value
    return map
  } catch {
    // If the table is unavailable, fall back to defaults everywhere.
    return {}
  }
})

/** Resolve a single key against the provided map, falling back to a default. */
export function resolve(
  map: Record<string, string>,
  key: string,
  fallback: string,
): string {
  const v = map[key]
  return v === undefined || v === null ? fallback : v
}
