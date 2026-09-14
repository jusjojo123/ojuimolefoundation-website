"use server"

import { db } from "@/lib/db"
import { siteContent } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth-helpers"
import { revalidatePath } from "next/cache"

type Result = { ok: true } | { ok: false; error: string }

const MAX_LEN = 20000
const ALLOWED_TYPES = new Set(["text", "richtext", "image"])

/**
 * Upsert an inline-editable content override. Requires a signed-in admin or
 * editor. Both roles may edit page copy/images; only security/user/newsletter
 * areas are admin-restricted (enforced in their own routes/actions).
 */
export async function saveSiteContent(
  key: string,
  type: string,
  value: string,
): Promise<Result> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }

  if (!key || typeof key !== "string" || key.length > 200) {
    return { ok: false, error: "Invalid key." }
  }
  if (!ALLOWED_TYPES.has(type)) {
    return { ok: false, error: "Invalid content type." }
  }
  if (typeof value !== "string" || value.length > MAX_LEN) {
    return { ok: false, error: "Value too long." }
  }

  const now = new Date()
  await db
    .insert(siteContent)
    .values({
      key,
      type,
      value,
      updatedById: user.id,
      updatedByName: user.name,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: siteContent.key,
      set: {
        type,
        value,
        updatedById: user.id,
        updatedByName: user.name,
        updatedAt: now,
      },
    })

  revalidatePath("/")
  return { ok: true }
}

/** Remove an override so the site falls back to its hardcoded default. */
export async function resetSiteContent(key: string): Promise<Result> {
  const user = await getCurrentUser()
  if (!user) return { ok: false, error: "Unauthorized" }
  await db.delete(siteContent).where(eq(siteContent.key, key))
  revalidatePath("/")
  return { ok: true }
}
