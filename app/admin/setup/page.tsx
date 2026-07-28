import Link from "next/link"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { hasAnyUser } from "@/app/actions/users"
import { SetupForm } from "@/components/admin/setup-form"

export const metadata: Metadata = {
  title: "First-Time Setup | Ojú Imọlẹ Media Foundation",
  robots: { index: false, follow: false },
}

export default async function AdminSetupPage() {
  // Once any account exists, setup is closed forever.
  const exists = await hasAnyUser()
  if (exists) redirect("/admin")

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="gold-text-gradient font-heading text-2xl tracking-wide">
              Ojú Imọlẹ
            </span>
          </Link>
          <h1 className="font-heading text-3xl text-cream mt-6 mb-2">First-Time Setup</h1>
          <p className="text-cream/50 text-sm max-w-sm mx-auto">
            Create the first administrator account. This page closes permanently once an account exists.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 glow-gold">
          <SetupForm />
        </div>
      </div>
    </main>
  )
}
