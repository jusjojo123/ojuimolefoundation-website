import "server-only"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export type Role = "admin" | "editor"

export type CurrentUser = {
  id: string
  name: string
  email: string
  role: Role
}

/** Returns the current session user, or null if not signed in. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  const u = session.user as typeof session.user & { role?: string }
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: (u.role as Role) ?? "editor",
  }
}

/** Requires any signed-in admin/editor. Redirects to /admin if not. */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser()
  if (!user) redirect("/admin")
  return user
}

/** Requires an admin. Editors are redirected back to the dashboard. */
export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireUser()
  if (user.role !== "admin") redirect("/admin/dashboard")
  return user
}
