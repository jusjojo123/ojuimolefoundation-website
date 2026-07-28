"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    await authClient.signOut()
    router.push("/admin")
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className={
        className ??
        "text-sm text-cream/60 hover:text-gold transition-colors disabled:opacity-50"
      }
    >
      {loading ? "Signing out…" : "Sign Out"}
    </button>
  )
}
