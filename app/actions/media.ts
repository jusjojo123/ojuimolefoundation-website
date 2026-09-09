"use server"

import { db } from "@/lib/db"
import { media } from "@/lib/db/schema"
import { requireUser } from "@/lib/auth-helpers"
import { and, desc, eq, ilike, or, sql } from "drizzle-orm"
import { del } from "@vercel/blob"
import { revalidatePath } from "next/cache"

export type SaveMediaInput = {
  url: string
  kind: "image" | "video" | "audio" | "document"
  filename?: string
  title?: string
  alt?: string
  tags?: string[]
  contentType?: string
  size?: number
  pathname?: string
}

export async function saveMedia(input: SaveMediaInput) {
  const user = await requireUser()
  const [row] = await db
    .insert(media)
    .values({
      url: input.url,
      kind: input.kind,
      filename: input.filename ?? null,
      title: input.title ?? null,
      alt: input.alt ?? null,
      tags: input.tags ?? [],
      contentType: input.contentType ?? null,
      size: input.size ?? null,
      pathname: input.pathname ?? null,
      uploadedById: user.id,
    })
    .returning()
  revalidatePath("/admin/dashboard/media")
  return { ok: true as const, media: row }
}

export async function listMedia(opts: { kind?: string; search?: string } = {}) {
  await requireUser()
  const conditions = []
  if (opts.kind && opts.kind !== "all") conditions.push(eq(media.kind, opts.kind))
  if (opts.search) {
    const q = `%${opts.search}%`
    conditions.push(or(ilike(media.title, q), ilike(media.filename, q), sql`${media.tags}::text ilike ${q}`))
  }
  return db
    .select()
    .from(media)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(media.createdAt))
    .limit(200)
}

export async function updateMedia(id: number, patch: { title?: string; alt?: string; tags?: string[] }) {
  await requireUser()
  await db
    .update(media)
    .set({
      ...(patch.title !== undefined ? { title: patch.title } : {}),
      ...(patch.alt !== undefined ? { alt: patch.alt } : {}),
      ...(patch.tags !== undefined ? { tags: patch.tags } : {}),
    })
    .where(eq(media.id, id))
  revalidatePath("/admin/dashboard/media")
  return { ok: true as const }
}

export async function deleteMedia(id: number) {
  const user = await requireUser()
  if (user.role !== "admin" && !user.canDelete) {
    return { ok: false as const, error: "You do not have permission to delete media." }
  }
  const [row] = await db.select().from(media).where(eq(media.id, id)).limit(1)
  if (row?.url) {
    try {
      await del(row.url)
    } catch (err) {
      console.log("[v0] blob delete error:", err)
    }
  }
  await db.delete(media).where(eq(media.id, id))
  revalidatePath("/admin/dashboard/media")
  return { ok: true as const }
}
