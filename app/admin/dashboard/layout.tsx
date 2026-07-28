import Link from "next/link"
import type { Metadata } from "next"
import { requireUser } from "@/lib/auth-helpers"
import { DashboardNav } from "@/components/admin/dashboard-nav"
import { SignOutButton } from "@/components/admin/sign-out-button"

export const metadata: Metadata = {
  title: "Dashboard | Ojú Imọ̀lẹ̀ Media Foundation",
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <header className="flex items-center justify-between py-6 border-b border-border">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <span className="gold-text-gradient font-heading text-xl tracking-wide">
              Ojú Imọ̀lẹ̀
            </span>
            <span className="text-cream/30 text-sm hidden sm:inline">CMS</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-cream leading-tight">{user.name}</p>
              <p className="text-xs text-gold/70 uppercase tracking-wider">{user.role}</p>
            </div>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-cream/60 hover:text-gold transition-colors hidden sm:inline"
            >
              View Site
            </Link>
            <SignOutButton />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <DashboardNav role={user.role} />
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}
