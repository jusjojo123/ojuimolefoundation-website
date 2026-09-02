"use server"

import { db } from "@/lib/db"
import { newsletterSubscriber } from "@/lib/db/schema"
import { requireAdmin } from "@/lib/auth-helpers"
import { desc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Public: subscribe an email to the newsletter. */
export async function subscribe(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const name = String(formData.get("name") ?? "").trim()
  const source = String(formData.get("source") ?? "website").trim()

  if (!EMAIL_RE.test(email)) {
    return { ok: false as const, error: "Please enter a valid email address." }
  }

  try {
    await db
      .insert(newsletterSubscriber)
      .values({ email, name: name || null, source: source || "website", status: "active" })
      .onConflictDoUpdate({
        target: newsletterSubscriber.email,
        set: { status: "active", name: name || null },
      })
    return { ok: true as const }
  } catch (err) {
    console.log("[v0] newsletter subscribe error:", err)
    return { ok: false as const, error: "Something went wrong. Please try again." }
  }
}

/** Admin-only: list all subscribers (contains PII — never expose to editors/public). */
export async function listSubscribers() {
  await requireAdmin()
  return db.select().from(newsletterSubscriber).orderBy(desc(newsletterSubscriber.createdAt))
}

/** Admin-only: subscriber counts by status. */
export async function subscriberStats() {
  await requireAdmin()
  const rows = await db
    .select({ status: newsletterSubscriber.status, count: sql<number>`count(*)::int` })
    .from(newsletterSubscriber)
    .groupBy(newsletterSubscriber.status)
  const stats = { total: 0, active: 0, unsubscribed: 0 }
  for (const r of rows) {
    stats.total += r.count
    if (r.status === "active") stats.active = r.count
    if (r.status === "unsubscribed") stats.unsubscribed = r.count
  }
  return stats
}

/** Admin-only: remove a subscriber. */
export async function removeSubscriber(id: number) {
  await requireAdmin()
  await db.delete(newsletterSubscriber).where(eq(newsletterSubscriber.id, id))
  revalidatePath("/admin/dashboard/newsletter")
  return { ok: true as const }
}
