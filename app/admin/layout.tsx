import type React from "react"
import { Sidebar } from "@/components/admin/sidebar"
import { SignOutButton } from "@/components/admin/sign-out-button"
import { getSession } from "@/lib/auth-helpers"

export const metadata = {
  title: "Admin | Ojú Imọlẹ Media Foundation",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  // The login route renders itself without the shell. When unauthenticated on
  // any other admin route, the individual pages redirect to /admin/login.
  if (!session?.user) {
    return <>{children}</>
  }

  return (
    <div className="min-h-svh bg-background text-cream">
      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <aside className="lg:sticky lg:top-0 lg:h-svh w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-border p-4 lg:p-6 flex flex-col">
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Ojú Imọlẹ</p>
            <p className="font-heading text-lg text-cream">Content Manager</p>
          </div>
          <Sidebar />
          <div className="mt-auto pt-6">
            <p className="mb-3 truncate text-xs text-muted-foreground">
              Signed in as {session.user.email}
            </p>
            <SignOutButton />
          </div>
        </aside>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
