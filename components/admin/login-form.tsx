"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await authClient.signIn.email({ email, password })
    if (error) {
      setError(error.message || "Invalid email or password.")
      setLoading(false)
      return
    }
    router.push("/admin/dashboard")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-cream/70 tracking-wide">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md bg-background border border-border px-4 py-3 text-cream outline-none focus:border-gold/60 transition-colors"
          placeholder="you@ojuimolefoundation.org"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm text-cream/70 tracking-wide">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md bg-background border border-border px-4 py-3 text-cream outline-none focus:border-gold/60 transition-colors"
          placeholder="Enter your password"
        />
      </div>

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
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  )
}
