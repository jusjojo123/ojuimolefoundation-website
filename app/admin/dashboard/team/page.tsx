import { requireUser } from "@/lib/auth-helpers"
import { getAllLeadership } from "@/lib/leadership"
import { TeamManager } from "@/components/admin/team-manager"

export default async function TeamPage() {
  const user = await requireUser()
  const members = await getAllLeadership()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl text-cream">Directors / Leadership</h1>
        <p className="text-cream/50 text-sm mt-1">
          Add, edit, reorder or remove the leadership team shown on the homepage.
        </p>
      </div>
      <TeamManager
        members={members}
        canPublish={user.canPublish}
        canDelete={user.canDelete}
      />
    </div>
  )
}
