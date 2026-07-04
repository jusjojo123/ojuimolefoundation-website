"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { hasAnyUser, requireUserId } from "@/lib/auth-helpers"
import { asc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

/**
 * One-time owner creation. Only works while no users exist yet.
 */
export async function createOwner(input: { name: string; email: string; password: string }) {
  if (await hasAnyUser()) {
    return { error: "Setup has already been completed. Please sign in." }
  }
  try {
    await auth.api.signUpEmail({
      body: { name: input.name, email: input.email, password: input.password },
    })
    return { success: true }
  } catch (error) {
    return { error: (error as Error).message || "Could not create account" }
  }
}

/**
 * Invite/add another admin user. Requires an authenticated session.
 */
export async function inviteAdmin(input: { name: string; email: string; password: string }) {
  await requireUserId()
  try {
    await auth.api.signUpEmail({
      body: { name: input.name, email: input.email, password: input.password },
    })
    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    return { error: (error as Error).message || "Could not add user" }
  }
}

export async function listAdmins() {
  await requireUserId()
  return db
    .select({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt })
    .from(user)
    .orderBy(asc(user.createdAt))
}

export async function removeAdmin(id: string) {
  const currentUserId = await requireUserId()
  if (id === currentUserId) {
    return { error: "You cannot remove your own account while signed in." }
  }
  const admins = await db.select({ id: user.id }).from(user)
  if (admins.length <= 1) {
    return { error: "Cannot remove the last remaining admin." }
  }
  await db.delete(user).where(eq(user.id, id))
  revalidatePath("/admin/users")
  return { success: true }
}
