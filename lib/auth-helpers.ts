import "server-only"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user as userTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export type Role = "admin" | "editor"

export type CurrentUser = {
  id: string
  name: string
  email: string
  role: Role
  /** Whether this user may publish/unpublish/archive content. Admins: always true. */
  canPublish: boolean
  /** Whether this user may delete content. Admins: always true. */
  canDelete: boolean
}

/** Returns the current session user, or null if not signed in. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null
  const u = session.user as typeof session.user & { role?: string }

  // Fetch role + permission flags fresh from the DB so admin changes take
  // effect immediately without waiting for a new session.
  const [row] = await db
    .select({
      role: userTable.role,
      canPublish: userTable.canPublish,
      canDelete: userTable.canDelete,
    })
    .from(userTable)
    .where(eq(userTable.id, u.id))
    .limit(1)

  const role = ((row?.role as Role) ?? (u.role as Role) ?? "editor") as Role
  const isAdmin = role === "admin"

  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role,
    canPublish: isAdmin || (row?.canPublish ?? false),
    canDelete: isAdmin || (row?.canDelete ?? false),
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
