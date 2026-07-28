"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { createUser, deleteUser, updateUserRole } from "@/app/actions/users"

type UserRow = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date | string
}

const inputClass =
  "w-full rounded-md bg-background border border-border px-4 py-2.5 text-cream outline-none focus:border-gold/60 transition-colors"

export function UserManager({ users, currentUserId }: { users: UserRow[]; currentUserId: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "editor" as "admin" | "editor" })
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  function refresh() {
    router.refresh()
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    const res = await createUser(form)
    if (!res.ok) {
      setError(res.error)
      return
    }
    setMessage(`Created ${form.email}.`)
    setForm({ name: "", email: "", password: "", role: "editor" })
    refresh()
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Add user */}
      <section className="rounded-lg bg-card border border-border p-6">
        <h2 className="font-heading text-xl text-cream mb-4">Add Team Member</h2>
        <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Full name" required />
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="Email" required />
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} placeholder="Temporary password (min 8 chars)" minLength={8} required />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "admin" | "editor" })} className={inputClass}>
            <option value="editor">Editor — create &amp; publish content</option>
            <option value="admin">Admin — full access incl. users</option>
          </select>
          <div className="sm:col-span-2 flex items-center gap-4">
            <button
              type="submit"
              className="rounded-md gold-gradient text-primary-foreground font-medium tracking-wide px-6 py-2.5 hover:opacity-90 transition-opacity"
            >
              Add Member
            </button>
            {error && <span className="text-sm text-red-400">{error}</span>}
            {message && <span className="text-sm text-green-400">{message}</span>}
          </div>
        </form>
      </section>

      {/* Existing users */}
      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-xl text-cream mb-2">Team Members</h2>
        {users.map((u) => {
          const isSelf = u.id === currentUserId
          return (
            <div
              key={u.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg bg-card border border-border px-4 py-3"
            >
              <div className="flex-1 min-w-0">
                <p className="text-cream truncate">
                  {u.name} {isSelf && <span className="text-xs text-gold/60">(you)</span>}
                </p>
                <p className="text-xs text-cream/40 truncate">{u.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={u.role}
                  disabled={isSelf || isPending}
                  onChange={(e) =>
                    startTransition(async () => {
                      await updateUserRole(u.id, e.target.value as "admin" | "editor")
                      refresh()
                    })
                  }
                  className="rounded-md bg-background border border-border px-3 py-2 text-sm text-cream outline-none focus:border-gold/60 disabled:opacity-50"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
                {!isSelf && (
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${u.name}?`)) {
                        startTransition(async () => {
                          const res = await deleteUser(u.id)
                          if (!res.ok) alert(res.error)
                          refresh()
                        })
                      }
                    }}
                    disabled={isPending}
                    className="text-sm text-red-400/80 hover:text-red-400 transition-colors disabled:opacity-50"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
