import "server-only"

import { db } from "@/lib/db"
import { contentItems, type ContentItem } from "@/lib/db/schema"
import { and, asc, desc, eq } from "drizzle-orm"
import type { ContentType } from "@/app/actions/content"

/**
 * Public fetch: only published items of a given type, ordered for display.
 * No auth required — used by the public website sections.
 */
export async function getPublishedContent(type: ContentType): Promise<ContentItem[]> {
  try {
    return await db
      .select()
      .from(contentItems)
      .where(and(eq(contentItems.type, type), eq(contentItems.published, true)))
      .orderBy(asc(contentItems.sortOrder), desc(contentItems.createdAt))
  } catch (error) {
    console.log("[v0] getPublishedContent error:", (error as Error).message)
    return []
  }
}
