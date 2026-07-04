"use server"

import { db } from "@/lib/db"
import { contentItems } from "@/lib/db/schema"
import { requireUserId } from "@/lib/auth-helpers"
import { and, asc, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const CONTENT_TYPES = [
  "article",
  "interview",
  "gallery",
  "video",
  "event",
  "announcement",
  "project",
] as const

export type ContentType = (typeof CONTENT_TYPES)[number]

function parseFormValues(formData: FormData) {
  const type = String(formData.get("type") || "").trim()
  const title = String(formData.get("title") || "").trim()
  const description = String(formData.get("description") || "").trim()
  const body = String(formData.get("body") || "").trim()
  const imageUrl = String(formData.get("imageUrl") || "").trim()
  const videoUrl = String(formData.get("videoUrl") || "").trim()
  const location = String(formData.get("location") || "").trim()
  const eventDateRaw = String(formData.get("eventDate") || "").trim()
  const published = formData.get("published") === "on" || formData.get("published") === "true"
  const sortOrderRaw = String(formData.get("sortOrder") || "").trim()

  return {
    type,
    title,
    description: description || null,
    body: body || null,
    imageUrl: imageUrl || null,
    videoUrl: videoUrl || null,
    location: location || null,
    eventDate: eventDateRaw ? new Date(eventDateRaw) : null,
    published,
    sortOrder: sortOrderRaw ? Number.parseInt(sortOrderRaw, 10) || 0 : 0,
  }
}

// ---- Admin reads (all items, any published state) ----
export async function getAllContent(type?: ContentType) {
  await requireUserId()
  if (type) {
    return db
      .select()
      .from(contentItems)
      .where(eq(contentItems.type, type))
      .orderBy(asc(contentItems.sortOrder), desc(contentItems.createdAt))
  }
  return db
    .select()
    .from(contentItems)
    .orderBy(asc(contentItems.sortOrder), desc(contentItems.createdAt))
}

export async function getContentById(id: number) {
  await requireUserId()
  const rows = await db.select().from(contentItems).where(eq(contentItems.id, id)).limit(1)
  return rows[0] ?? null
}

// ---- Mutations ----
export async function createContent(formData: FormData) {
  const userId = await requireUserId()
  const values = parseFormValues(formData)
  if (!values.type || !values.title) {
    throw new Error("Type and title are required")
  }
  await db.insert(contentItems).values({ ...values, authorId: userId })
  revalidatePath("/admin")
  revalidatePath("/")
}

export async function updateContent(id: number, formData: FormData) {
  await requireUserId()
  const values = parseFormValues(formData)
  if (!values.title) {
    throw new Error("Title is required")
  }
  await db
    .update(contentItems)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(contentItems.id, id))
  revalidatePath("/admin")
  revalidatePath("/")
}

export async function togglePublished(id: number, published: boolean) {
  await requireUserId()
  await db
    .update(contentItems)
    .set({ published, updatedAt: new Date() })
    .where(eq(contentItems.id, id))
  revalidatePath("/admin")
  revalidatePath("/")
}

export async function deleteContent(id: number) {
  await requireUserId()
  await db.delete(contentItems).where(eq(contentItems.id, id))
  revalidatePath("/admin")
  revalidatePath("/")
}
