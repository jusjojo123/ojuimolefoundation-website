"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { inviteAdmin, removeAdmin } from "@/app/actions/users"
import { AdminInput, AdminButton, AdminCard } from "@/components/admin/ui"
import { Trash2 } from "lucide-react"

type Admin = { id: string; name: string; email: string; createdAt: Date | string }

export function UsersManager({
  admins,
  currentUserId,
}: {
  admins: Admin[]
  currentUserId: string
}) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    const result = await inviteAdmin({ name, email, password })
    if (result.error) {
      setError(result.error)
      return
    }
    setMessage(`${email} can now sign in.`)
    setName("")
    setEmail("")
    setPassword("")
    router.refresh()
  }

  function handleRemove(admin: Admin) {
    if (!confirm(`Remove ${admin.email}? They will lose admin access.`)) return
    startTransition(async () => {
      const result = await removeAdmin(admin.id)
      if (result?.error) {
        setError(result.error)
        return
      }
      router.refresh()
    })
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="mb-4 font-heading text-lg text-cream">Current admins</h2>
        <ul className="flex flex-col gap-3">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-cream">
                  {admin.name}
                  {admin.id === currentUserId && (
                    <span className="ml-2 text-xs text-gold">(you)</span>
                  )}
                </p>
                <p className="truncate text-sm text-muted-foreground">{admin.email}</p>
              </div>
              {admin.id !== currentUserId && (
                <button
                  onClick={() => handleRemove(admin)}
                  disabled={pending}
                  className="rounded-lg border border-red-500/30 p-2 text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                  aria-label={`Remove ${admin.email}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="mb-4 font-heading text-lg text-cream">Add a new admin</h2>
        <AdminCard>
          <form onSubmit={handleInvite} className="flex flex-col gap-4">
            <AdminInput
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Jane Doe"
            />
            <AdminInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jane@example.com"
            />
            <AdminInput
              label="Temporary password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="At least 8 characters"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            {message && <p className="text-sm text-gold">{message}</p>}
            <AdminButton type="submit">Add admin</AdminButton>
          </form>
        </AdminCard>
      </div>
    </div>
  )
}
