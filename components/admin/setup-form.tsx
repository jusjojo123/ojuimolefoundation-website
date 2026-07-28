"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createFirstAdmin } from "@/app/actions/users"
import { authClient } from "@/lib/auth-client"

export function SetupForm() {
  const router = useRouter()
  const [form, setForm] = useState({ setupKey: "", name: "", email: "", password: "" })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const res = await createFirstAdmin(form)
    if (!res.ok) {
      setError(res.error)
      setLoading(false)
      return
    }
    // Account created — sign in immediately.
    const { error } = await authClient.signIn.email({
      email: form.email.trim().toLowerCase(),
      password: form.password,
    })
    if (error) {
      // Account exists; send them to login.
      router.push("/admin")
      return
    }
    router.push("/admin/dashboard")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Field label="Setup Key" hint="The ADMIN_SETUP_KEY configured for this site.">
        <input
          type="password"
          required
          value={form.setupKey}
          onChange={update("setupKey")}
          className={inputClass}
          placeholder="Enter the secret setup key"
        />
      </Field>
      <Field label="Full Name">
        <input type="text" required value={form.name} onChange={update("name")} className={inputClass} placeholder="Administrator name" />
      </Field>
      <Field label="Email">
        <input type="email" required value={form.email} onChange={update("email")} className={inputClass} placeholder="admin@ojuimolefoundation.org" />
      </Field>
      <Field label="Password" hint="At least 8 characters.">
        <input type="password" required minLength={8} value={form.password} onChange={update("password")} className={inputClass} placeholder="Create a strong password" />
      </Field>

      {error && (
        <p role="alert" className="text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-md px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-md gold-gradient text-primary-foreground font-medium tracking-wide py-3 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creating account…" : "Create Administrator Account"}
      </button>
    </form>
  )
}

const inputClass =
  "w-full rounded-md bg-background border border-border px-4 py-3 text-cream outline-none focus:border-gold/60 transition-colors"

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-cream/70 tracking-wide">{label}</label>
      {children}
      {hint && <span className="text-xs text-cream/40">{hint}</span>}
    </div>
  )
}
