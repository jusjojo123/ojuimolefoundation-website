import Link from "next/link"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { getCurrentUser } from "@/lib/auth-helpers"
import { hasAnyUser } from "@/app/actions/users"
import { LoginForm } from "@/components/admin/login-form"

export const metadata: Metadata = {
  title: "Admin Login | Ojú Imọlẹ Media Foundation",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const user = await getCurrentUser()
  if (user) redirect("/admin/dashboard")

  // No accounts yet? Send the very first visitor to the one-time setup.
  const exists = await hasAnyUser()
  if (!exists) redirect("/admin/setup")

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="gold-text-gradient font-heading text-2xl tracking-wide">
              Ojú Imọlẹ
            </span>
          </Link>
          <h1 className="font-heading text-3xl text-cream mt-6 mb-2">Admin Login</h1>
          <p className="text-cream/50 text-sm">
            Sign in to manage the foundation&apos;s content.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 glow-gold">
          <LoginForm />
        </div>

        <p className="text-center text-cream/40 text-sm mt-8">
          <Link href="/" className="hover:text-gold transition-colors">
            ← Back to website
          </Link>
        </p>
      </div>
    </main>
  )
}
