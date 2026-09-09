import { getCurrentUser } from "@/lib/auth-helpers"
import { EditProvider } from "./edit-context"
import { EditToolbar } from "./edit-toolbar"
import type { ReactNode } from "react"

/**
 * Server wrapper for public pages. Detects whether the current visitor is a
 * signed-in admin/editor and, if so, enables the inline editing runtime plus
 * the floating toolbar. Public visitors get a plain, non-interactive tree.
 */
export async function EditRoot({ children }: { children: ReactNode }) {
  const user = await getCurrentUser()
  const canEdit = !!user
  const role = user?.role ?? null

  return (
    <EditProvider canEdit={canEdit} role={role}>
      {children}
      <EditToolbar />
    </EditProvider>
  )
}
