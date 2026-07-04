import "server-only"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { sql } from "drizzle-orm"
import { headers } from "next/headers"

/**
 * Returns the current session (or null). Safe to call in Server Components.
 */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

/**
 * Throws if there is no authenticated user. Returns the user id.
 * Use in every content mutation so the admin area stays private.
 */
export async function requireUserId() {
  const session = await getSession()
  if (!session?.user) throw new Error("Unauthorized")
  return session.user.id
}

/**
 * True when at least one admin account exists. Used to decide whether the
 * one-time owner setup flow is still available.
 */
export async function hasAnyUser() {
  const rows = await db.select({ count: sql<number>`count(*)` }).from(user)
  return Number(rows[0]?.count ?? 0) > 0
}
