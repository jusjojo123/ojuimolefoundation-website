"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  const router = useRouter()
  async function handleSignOut() {
    await authClient.signOut()
    router.push("/admin/login")
    router.refresh()
  }
  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-cream/80 transition-colors hover:bg-muted hover:text-cream"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  )
}
