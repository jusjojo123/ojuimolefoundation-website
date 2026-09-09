import "server-only"
import { cache } from "react"
import { db } from "@/lib/db"
import { content } from "@/lib/db/schema"
import { and, asc, eq } from "drizzle-orm"

export type LeadershipMember = {
  id: number
  name: string
  role: string
  description: string
  image: string | null
  imagePosition: string
  isFramed: boolean
  sortOrder: number
  status: string
}

function toMember(row: typeof content.$inferSelect): LeadershipMember {
  const meta = (row.meta ?? {}) as Record<string, unknown>
  return {
    id: row.id,
    name: row.title,
    role: row.excerpt ?? "",
    description: row.body ?? "",
    image: row.coverImage ?? null,
    imagePosition: typeof meta.imagePosition === "string" ? meta.imagePosition : "object-center",
    isFramed: meta.isFramed === true,
    sortOrder: row.sortOrder,
    status: row.status,
  }
}

/** Public: only published leadership members, ordered for display. */
export const getPublishedLeadership = cache(async (): Promise<LeadershipMember[]> => {
  try {
    const rows = await db
      .select()
      .from(content)
      .where(and(eq(content.type, "leadership"), eq(content.status, "published")))
      .orderBy(asc(content.sortOrder), asc(content.id))
    return rows.map(toMember)
  } catch {
    return []
  }
})

/** Admin: all leadership members regardless of status, ordered. */
export async function getAllLeadership(): Promise<LeadershipMember[]> {
  const rows = await db
    .select()
    .from(content)
    .where(eq(content.type, "leadership"))
    .orderBy(asc(content.sortOrder), asc(content.id))
  return rows.map(toMember)
}
