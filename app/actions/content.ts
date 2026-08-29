"use server"

import { db } from "@/lib/db"
import { content, type GalleryImage } from "@/lib/db/schema"
import { getCurrentUser } from "@/lib/auth-helpers"
import { contentTypePath, isValidContentType } from "@/lib/content-config"
import { and, desc, eq, ilike, or, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export type ContentActionResult =
  | { ok: true; id: number; slug: string }
  | { ok: false; error: string }

export type ContentStatus = "draft" | "published" | "archived"

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

async function uniqueSlug(base: string, ignoreId?: number): Promise<string> {
  const root = base || "untitled"
  let candidate = root
  let n = 1
  while (true) {
    const existing = await db
      .select({ id: content.id })
      .from(content)
      .where(eq(content.slug, candidate))
      .limit(1)
    if (existing.length === 0 || existing[0].id === ignoreId) return candidate
    n += 1
    candidate = `${root}-${n}`
  }
}

type ContentInput = {
  id?: number
  type: string
  title: string
  slug?: string
  excerpt?: string
  body?: string
  category?: string
  coverImage?: string
  videoUrl?: string
  audioUrl?: string
  documentUrl?: string
  gallery?: GalleryImage[]
  tags?: string[]
  location?: string
  eventDate?: string | null
  publishDate?: string | null
  authorName?: string
  seoTitle?: string
  seoDescription?: string
  socialImage?: string
  featured?: boolean
  status?: ContentStatus
}

/** Revalidate the public surfaces that depend on CMS content. */
function revalidatePublic(type?: string) {
  revalidatePath("/", "layout")
  revalidatePath("/")
  if (type) revalidatePath(`/${contentTypePath(type)}`)
}

export async function saveContent(input: ContentInput): Promise<ContentActionResult> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }

  if (!input.title?.trim()) return { ok: false, error: "Title is required." }
  if (!isValidContentType(input.type)) return { ok: false, error: "Invalid content type." }

  // Resolve requested status against this user's permissions.
  let status: ContentStatus =
    input.status === "published" || input.status === "archived" ? input.status : "draft"
  if ((status === "published" || status === "archived") && !user.canPublish) {
    // Editors without publish rights can only save drafts.
    status = "draft"
  }

  const slug = await uniqueSlug(
    input.slug?.trim() ? slugify(input.slug) : slugify(input.title),
    input.id,
  )
  const eventDate = input.eventDate ? new Date(input.eventDate) : null
  const publishDate = input.publishDate ? new Date(input.publishDate) : null

  const values = {
    type: input.type,
    title: input.title.trim(),
    slug,
    excerpt: input.excerpt?.trim() || null,
    body: input.body ?? null,
    category: input.category?.trim() || null,
    coverImage: input.coverImage?.trim() || null,
    videoUrl: input.videoUrl?.trim() || null,
    audioUrl: input.audioUrl?.trim() || null,
    documentUrl: input.documentUrl?.trim() || null,
    gallery: input.gallery ?? [],
    tags: input.tags ?? [],
    location: input.location?.trim() || null,
    eventDate,
    publishDate,
    authorName: input.authorName?.trim() || user.name,
    seoTitle: input.seoTitle?.trim() || null,
    seoDescription: input.seoDescription?.trim() || null,
    socialImage: input.socialImage?.trim() || null,
    status,
    featured: input.featured ?? false,
    updatedById: user.id,
    updatedByName: user.name,
    updatedAt: new Date(),
  }

  try {
    if (input.id) {
      const [existing] = await db
        .select({ publishedAt: content.publishedAt })
        .from(content)
        .where(eq(content.id, input.id))
        .limit(1)
      const publishedAt =
        status === "published"
          ? existing?.publishedAt ?? new Date()
          : existing?.publishedAt ?? null

      const [row] = await db
        .update(content)
        .set({ ...values, publishedAt })
        .where(eq(content.id, input.id))
        .returning({ id: content.id, slug: content.slug })
      revalidatePublic(input.type)
      return { ok: true, id: row.id, slug: row.slug }
    }

    const [row] = await db
      .insert(content)
      .values({
        ...values,
        authorId: user.id,
        publishedAt: status === "published" ? new Date() : null,
      })
      .returning({ id: content.id, slug: content.slug })
    revalidatePublic(input.type)
    return { ok: true, id: row.id, slug: row.slug }
  } catch (err) {
    console.log("[v0] saveContent failed:", err)
    return { ok: false, error: "Could not save. Please try again." }
  }
}

export async function setPublishStatus(
  id: number,
  status: ContentStatus,
): Promise<ContentActionResult> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }
  if (!user.canPublish)
    return { ok: false, error: "You do not have permission to change publish status." }

  try {
    const [existing] = await db
      .select({ publishedAt: content.publishedAt, slug: content.slug, type: content.type })
      .from(content)
      .where(eq(content.id, id))
      .limit(1)
    if (!existing) return { ok: false, error: "Not found." }

    const publishedAt =
      status === "published" ? existing.publishedAt ?? new Date() : existing.publishedAt

    const [row] = await db
      .update(content)
      .set({
        status,
        publishedAt,
        updatedById: user.id,
        updatedByName: user.name,
        updatedAt: new Date(),
      })
      .where(eq(content.id, id))
      .returning({ id: content.id, slug: content.slug })
    revalidatePublic(existing.type)
    return { ok: true, id: row.id, slug: row.slug }
  } catch (err) {
    console.log("[v0] setPublishStatus failed:", err)
    return { ok: false, error: "Could not update status." }
  }
}

export async function toggleFeatured(
  id: number,
  featured: boolean,
): Promise<ContentActionResult> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }
  try {
    const [row] = await db
      .update(content)
      .set({ featured, updatedAt: new Date() })
      .where(eq(content.id, id))
      .returning({ id: content.id, slug: content.slug, type: content.type })
    if (!row) return { ok: false, error: "Not found." }
    revalidatePublic(row.type)
    return { ok: true, id: row.id, slug: row.slug }
  } catch (err) {
    console.log("[v0] toggleFeatured failed:", err)
    return { ok: false, error: "Could not update." }
  }
}

export async function deleteContent(id: number): Promise<{ ok: boolean; error?: string }> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }
  if (!user.canDelete)
    return { ok: false, error: "You do not have permission to delete content." }
  try {
    const [row] = await db
      .delete(content)
      .where(eq(content.id, id))
      .returning({ type: content.type })
    revalidatePublic(row?.type)
    return { ok: true }
  } catch (err) {
    console.log("[v0] deleteContent failed:", err)
    return { ok: false, error: "Could not delete." }
  }
}

/** Dashboard listing with optional type filter, status filter, and search. */
export async function listContent(opts: {
  type?: string
  status?: string
  q?: string
}) {
  const user = await getCurrentUser()
  if (!user) return []

  const filters = []
  if (opts.type && opts.type !== "all") filters.push(eq(content.type, opts.type))
  if (opts.status && opts.status !== "all") filters.push(eq(content.status, opts.status))
  if (opts.q?.trim()) {
    const term = `%${opts.q.trim()}%`
    filters.push(
      or(
        ilike(content.title, term),
        ilike(content.excerpt, term),
        ilike(content.category, term),
      ),
    )
  }

  return db
    .select()
    .from(content)
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(content.updatedAt))
}

export async function getContentById(id: number) {
  const user = await getCurrentUser()
  if (!user) return null
  const [row] = await db.select().from(content).where(eq(content.id, id)).limit(1)
  return row ?? null
}

export async function getDashboardStats() {
  const user = await getCurrentUser()
  if (!user) return { total: 0, published: 0, drafts: 0, archived: 0 }
  const [row] = await db
    .select({
      total: sql<number>`count(*)::int`,
      published: sql<number>`count(*) filter (where ${content.status} = 'published')::int`,
      drafts: sql<number>`count(*) filter (where ${content.status} = 'draft')::int`,
      archived: sql<number>`count(*) filter (where ${content.status} = 'archived')::int`,
    })
    .from(content)
  return row ?? { total: 0, published: 0, drafts: 0, archived: 0 }
}
