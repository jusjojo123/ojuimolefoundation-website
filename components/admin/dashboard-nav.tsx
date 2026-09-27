"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type NavItem = { href: string; label: string; adminOnly?: boolean }

const NAV: NavItem[] = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/dashboard/analytics", label: "Analytics", adminOnly: true },
  { href: "/admin/dashboard/new", label: "New Content" },
  { href: "/admin/dashboard/media", label: "Media Library" },
  { href: "/admin/dashboard/team", label: "Directors / Leadership" },
  { href: "/admin/dashboard/newsletter", label: "Newsletter", adminOnly: true },
  { href: "/admin/dashboard/users", label: "Team & Roles", adminOnly: true },
]

export function DashboardNav({ role }: { role: "admin" | "editor" }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {NAV.filter((item) => !item.adminOnly || role === "admin").map((item) => {
        const active =
          item.href === "/admin/dashboard" || item.href === "/admin/dashboard/new"
            ? pathname === item.href
            : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-md px-4 py-2.5 text-sm tracking-wide transition-colors ${
              active
                ? "bg-gold/15 text-gold border border-gold/30"
                : "text-cream/60 hover:text-cream hover:bg-muted border border-transparent"
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
