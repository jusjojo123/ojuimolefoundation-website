import "server-only"
import { db } from "@/lib/db"
import { content, type Content } from "@/lib/db/schema"
import { and, desc, eq, inArray } from "drizzle-orm"

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
