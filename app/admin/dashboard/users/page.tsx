import { requireAdmin } from "@/lib/auth-helpers"
import { listUsers } from "@/app/actions/users"
import { UserManager } from "@/components/admin/user-manager"

export default async function UsersPage() {
  const user = await requireAdmin()
  const users = await listUsers()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl text-cream">Team &amp; Roles</h1>
        <p className="text-cream/50 text-sm mt-1">
          Add administrators and editors, and manage their access.
        </p>
      </div>
      <UserManager users={users} currentUserId={user.id} />
    </div>
  )
}
