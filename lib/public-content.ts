import "server-only"
import { db } from "@/lib/db"
import { content, type Content } from "@/lib/db/schema"
import { and, desc, eq, inArray, ne, sql } from "drizzle-orm"
import {
  CONTENT_TYPE_LIST,
  type ContentTypeConfig,
} from "@/lib/content-config"

// Public queries only ever return PUBLISHED rows. These are safe to call from
// server components rendering the marketing site.

export async function getPublishedByTypes(
  types: string[],
  limit = 12,
): Promise<Content[]> {
  try {
    return await db
      .select()
      .from(content)
      .where(and(eq(content.status, "published"), inArray(content.type, types)))
      .orderBy(desc(content.featured), desc(content.publishedAt), desc(content.createdAt))
      .limit(limit)
  } catch (err) {
    console.log("[v0] getPublishedByTypes failed:", err)
    return []
  }
}

export async function getFeaturedByType(type: string): Promise<Content | null> {
  try {
    const [featured] = await db
      .select()
      .from(content)
      .where(and(eq(content.status, "published"), eq(content.type, type), eq(content.featured, true)))
      .orderBy(desc(content.publishedAt))
      .limit(1)
    if (featured) return featured
    const [latest] = await db
      .select()
      .from(content)
      .where(and(eq(content.status, "published"), eq(content.type, type)))
      .orderBy(desc(content.publishedAt))
      .limit(1)
    return latest ?? null
  } catch (err) {
    console.log("[v0] getFeaturedByType failed:", err)
    return null
  }
}

// --- Section-based helpers (drive the public /[section] routes) -------------

/** Resolve a URL section (== a content type's `path`) to its config. */
export function configForPath(path: string): ContentTypeConfig | undefined {
  return CONTENT_TYPE_LIST.find((c) => c.path === path)
}

/** All distinct section paths, used by generateStaticParams. */
export function allSectionPaths(): string[] {
  return Array.from(new Set(CONTENT_TYPE_LIST.map((c) => c.path)))
}

/** Published items for a section (a section maps to exactly one type here). */
export async function getPublishedForPath(
  path: string,
  limit = 60,
): Promise<Content[]> {
  const cfg = configForPath(path)
  if (!cfg) return []
  return getPublishedByTypes([cfg.type], limit)
}

/** Fetch a single published item by its slug. */
export async function getPublishedBySlug(slug: string): Promise<Content | null> {
  try {
    const [row] = await db
      .select()
      .from(content)
      .where(
        and(
          eq(content.status, "published"),
          eq(content.slug, slug),
          // The homepage team section is not a standalone detail page.
          ne(content.type, "leadership"),
        ),
      )
      .limit(1)
    return row ?? null
  } catch (err) {
    console.log("[v0] getPublishedBySlug failed:", err)
    return null
  }
}

/** Slugs for all published content — powers generateStaticParams / sitemap. */
export async function allPublishedSlugs(): Promise<
  { slug: string; type: string; updatedAt: Date }[]
> {
  try {
    return await db
      .select({ slug: content.slug, type: content.type, updatedAt: content.updatedAt })
      .from(content)
      .where(and(eq(content.status, "published"), ne(content.type, "leadership")))
  } catch (err) {
    console.log("[v0] allPublishedSlugs failed:", err)
    return []
  }
}

/** A few related items from the same type, excluding the current one. */
export async function getRelated(type: string, excludeId: number, limit = 3): Promise<Content[]> {
  try {
    return await db
      .select()
      .from(content)
      .where(
        and(
          eq(content.status, "published"),
          eq(content.type, type),
          sql`${content.id} <> ${excludeId}`,
        ),
      )
      .orderBy(desc(content.publishedAt))
      .limit(limit)
  } catch (err) {
    console.log("[v0] getRelated failed:", err)
    return []
  }
}

/** Count of published items per section — used to build public navigation. */
export async function sectionsWithContent(): Promise<
  { path: string; label: string; plural: string; section: string; count: number }[]
> {
  try {
    const rows = await db
      .select({ type: content.type, count: sql<number>`count(*)::int` })
      .from(content)
      .where(eq(content.status, "published"))
      .groupBy(content.type)
    const counts = new Map(rows.map((r) => [r.type, r.count]))
    return CONTENT_TYPE_LIST.filter((c) => (counts.get(c.type) ?? 0) > 0).map((c) => ({
      path: c.path,
      label: c.label,
      plural: c.plural,
      section: c.section,
      count: counts.get(c.type) ?? 0,
    }))
  } catch (err) {
    console.log("[v0] sectionsWithContent failed:", err)
    return []
  }
}
