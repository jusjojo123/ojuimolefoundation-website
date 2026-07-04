"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { createOwner } from "@/app/actions/users"
import { AdminInput, AdminButton, AdminCard } from "@/components/admin/ui"

export function LoginForm({ needsSetup }: { needsSetup: boolean }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (needsSetup) {
      const result = await createOwner({ name, email, password })
      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }
      // Owner created (autoSignIn enabled) — sign in to be safe.
      await authClient.signIn.email({ email, password })
      router.push("/admin")
      router.refresh()
      return
    }

    const { error } = await authClient.signIn.email({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message ?? "Invalid email or password")
      return
    }
    router.push("/admin")
    router.refresh()
  }

  return (
    <main className="min-h-svh bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Ojú Imọlẹ Media Foundation</p>
          <h1 className="font-heading text-2xl text-cream text-balance">
            {needsSetup ? "Create Your Admin Account" : "Admin Sign In"}
          </h1>
          <p className="text-sm text-muted-foreground mt-2 text-pretty">
            {needsSetup
              ? "This is a one-time setup for the site owner."
              : "Sign in to manage your website content."}
          </p>
        </div>

        <AdminCard>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {needsSetup && (
              <AdminInput
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="Jane Doe"
              />
            )}
            <AdminInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
            <AdminInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={needsSetup ? "new-password" : "current-password"}
              placeholder={needsSetup ? "At least 8 characters" : "Your password"}
            />

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            <AdminButton type="submit" disabled={loading}>
              {loading ? "Please wait..." : needsSetup ? "Create account" : "Sign in"}
            </AdminButton>
          </form>
        </AdminCard>
      </div>
    </main>
  )
}
