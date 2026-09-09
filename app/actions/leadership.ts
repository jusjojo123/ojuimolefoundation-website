"use server"

import { db } from "@/lib/db"
import { content } from "@/lib/db/schema"
import { getCurrentUser } from "@/lib/auth-helpers"
import { and, asc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

type Result = { ok: true } | { ok: false; error: string }

export type LeadershipInput = {
  id?: number
  name: string
  role: string
  description: string
  image: string | null
  imagePosition: string
  isFramed: boolean
  status: "published" | "draft"
}

/** Create or update a leadership member. Admin/editor only. */
export async function saveLeadership(input: LeadershipInput): Promise<Result> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }

  const name = input.name.trim()
  if (!name) return { ok: false, error: "Name is required." }

  // Editors without publish permission can only save drafts.
  let status = input.status
  if (status === "published" && !user.canPublish) {
    status = "draft"
  }

  const meta = { isFramed: input.isFramed, imagePosition: input.imagePosition }
  const now = new Date()

  try {
    if (input.id) {
      await db
        .update(content)
        .set({
          title: name,
          excerpt: input.role.trim(),
          body: input.description.trim(),
          coverImage: input.image,
          meta,
          status,
          updatedById: user.id,
          updatedByName: user.name,
          updatedAt: now,
        })
        .where(and(eq(content.id, input.id), eq(content.type, "leadership")))
      revalidatePath("/")
      revalidatePath("/admin/dashboard/team")
      return { ok: true }
    }

    // New member: place at the end.
    const [max] = await db
      .select({ m: sql<number>`coalesce(max(${content.sortOrder}), -1)` })
      .from(content)
      .where(eq(content.type, "leadership"))
    const nextOrder = (max?.m ?? -1) + 1
    const slug = `leadership-${Date.now()}`

    await db.insert(content).values({
      type: "leadership",
      title: name,
      slug,
      excerpt: input.role.trim(),
      body: input.description.trim(),
      coverImage: input.image,
      meta,
      status,
      sortOrder: nextOrder,
      authorId: user.id,
      authorName: user.name,
      updatedById: user.id,
      updatedByName: user.name,
      publishedAt: status === "published" ? now : null,
    })
    revalidatePath("/")
    revalidatePath("/admin/dashboard/team")
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Save failed." }
  }
}

/** Delete a leadership member. Requires delete permission. */
export async function deleteLeadership(id: number): Promise<Result> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }
  if (!user.canDelete) return { ok: false, error: "You do not have permission to delete." }

  try {
    await db.delete(content).where(and(eq(content.id, id), eq(content.type, "leadership")))
    revalidatePath("/")
    revalidatePath("/admin/dashboard/team")
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Delete failed." }
  }
}

/** Move a member up or down by swapping sortOrder with its neighbour. */
export async function reorderLeadership(id: number, direction: "up" | "down"): Promise<Result> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }

  try {
    const rows = await db
      .select({ id: content.id, sortOrder: content.sortOrder })
      .from(content)
      .where(eq(content.type, "leadership"))
      .orderBy(asc(content.sortOrder), asc(content.id))

    const idx = rows.findIndex((r) => r.id === id)
    if (idx === -1) return { ok: false, error: "Member not found." }
    const swapWith = direction === "up" ? idx - 1 : idx + 1
    if (swapWith < 0 || swapWith >= rows.length) return { ok: true } // already at edge

    const a = rows[idx]
    const b = rows[swapWith]
    // Swap using sequential indices to avoid collisions.
    await db.update(content).set({ sortOrder: b.sortOrder }).where(eq(content.id, a.id))
    await db.update(content).set({ sortOrder: a.sortOrder }).where(eq(content.id, b.id))
    revalidatePath("/")
    revalidatePath("/admin/dashboard/team")
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Reorder failed." }
  }
}
