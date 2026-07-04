import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth-helpers"
import { listAdmins } from "@/app/actions/users"
import { UsersManager } from "@/components/admin/users-manager"

export default async function AdminUsersPage() {
  const session = await getSession()
  if (!session?.user) redirect("/admin/login")

  const admins = await listAdmins()

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-heading text-2xl lg:text-3xl text-cream">Admin Users</h1>
        <p className="mt-1 text-muted-foreground">
          Manage who can sign in and edit website content.
        </p>
      </header>
      <UsersManager admins={admins} currentUserId={session.user.id} />
    </div>
  )
}
