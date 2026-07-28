"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user as userTable } from "@/lib/db/schema"
import { getCurrentUser } from "@/lib/auth-helpers"
import { asc, eq, sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export type SimpleResult = { ok: true } | { ok: false; error: string }

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * One-time bootstrap: creates the very first administrator. Guarded by
 * ADMIN_SETUP_KEY and refuses to run once any user exists.
 */
export async function createFirstAdmin(input: {
  setupKey: string
  name: string
  email: string
  password: string
}): Promise<SimpleResult> {
  const expected = process.env.ADMIN_SETUP_KEY
  if (!expected) return { ok: false, error: "Setup key is not configured on the server." }
  if (input.setupKey !== expected) return { ok: false, error: "Invalid setup key." }

  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(userTable)
  if (count > 0) {
    return { ok: false, error: "Setup already completed. An account already exists." }
  }

  if (!input.name?.trim()) return { ok: false, error: "Name is required." }
  if (!validEmail(input.email)) return { ok: false, error: "Enter a valid email." }
  if (input.password.length < 8) return { ok: false, error: "Password must be at least 8 characters." }

  try {
    await auth.api.signUpEmail({
      body: {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        password: input.password,
      },
    })
  } catch (err) {
    console.log("[v0] createFirstAdmin signUp failed:", err)
    return { ok: false, error: "Could not create the account. It may already exist." }
  }

  await db
    .update(userTable)
    .set({ role: "admin", emailVerified: true })
    .where(eq(userTable.email, input.email.trim().toLowerCase()))

  return { ok: true }
}

/** Admin-only: create an additional admin or editor account. */
export async function createUser(input: {
  name: string
  email: string
  password: string
  role: "admin" | "editor"
}): Promise<SimpleResult> {
  const current = await getCurrentUser()
  if (!current) return { ok: false, error: "Unauthorized" }
  if (current.role !== "admin") return { ok: false, error: "Only admins can add users." }

  if (!input.name?.trim()) return { ok: false, error: "Name is required." }
  if (!validEmail(input.email)) return { ok: false, error: "Enter a valid email." }
  if (input.password.length < 8) return { ok: false, error: "Password must be at least 8 characters." }
  const role = input.role === "admin" ? "admin" : "editor"

  try {
    await auth.api.signUpEmail({
      body: {
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        password: input.password,
      },
    })
  } catch (err) {
    console.log("[v0] createUser signUp failed:", err)
    return { ok: false, error: "Could not create user. The email may already be in use." }
  }

  await db
    .update(userTable)
    .set({ role, emailVerified: true })
    .where(eq(userTable.email, input.email.trim().toLowerCase()))

  revalidatePath("/admin/dashboard/users")
  return { ok: true }
}

/** Admin-only: change a user's role. */
export async function updateUserRole(
  userId: string,
  role: "admin" | "editor",
): Promise<SimpleResult> {
  const current = await getCurrentUser()
  if (!current) return { ok: false, error: "Unauthorized" }
  if (current.role !== "admin") return { ok: false, error: "Only admins can change roles." }
  if (userId === current.id) return { ok: false, error: "You cannot change your own role." }

  await db
    .update(userTable)
    .set({ role: role === "admin" ? "admin" : "editor" })
    .where(eq(userTable.id, userId))
  revalidatePath("/admin/dashboard/users")
  return { ok: true }
}

/** Admin-only: delete a user. Cannot delete yourself or the last admin. */
export async function deleteUser(userId: string): Promise<SimpleResult> {
  const current = await getCurrentUser()
  if (!current) return { ok: false, error: "Unauthorized" }
  if (current.role !== "admin") return { ok: false, error: "Only admins can remove users." }
  if (userId === current.id) return { ok: false, error: "You cannot remove your own account." }

  const [{ admins }] = await db
    .select({ admins: sql<number>`count(*)::int` })
    .from(userTable)
    .where(eq(userTable.role, "admin"))
  const [target] = await db
    .select({ role: userTable.role })
    .from(userTable)
    .where(eq(userTable.id, userId))
    .limit(1)
  if (target?.role === "admin" && admins <= 1) {
    return { ok: false, error: "Cannot remove the last remaining admin." }
  }

  await db.delete(userTable).where(eq(userTable.id, userId))
  revalidatePath("/admin/dashboard/users")
  return { ok: true }
}

export async function listUsers() {
  const current = await getCurrentUser()
  if (!current || current.role !== "admin") return []
  return db
    .select({
      id: userTable.id,
      name: userTable.name,
      email: userTable.email,
      role: userTable.role,
      createdAt: userTable.createdAt,
    })
    .from(userTable)
    .orderBy(asc(userTable.createdAt))
}

/** Whether any account exists — used to gate the setup page. */
export async function hasAnyUser(): Promise<boolean> {
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(userTable)
  return count > 0
}
