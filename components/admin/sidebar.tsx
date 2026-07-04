"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Mic,
  ImageIcon,
  Video,
  Calendar,
  Megaphone,
  HeartHandshake,
  Users,
  ExternalLink,
} from "lucide-react"

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/article", label: "Articles", icon: FileText },
  { href: "/admin/interview", label: "Interviews", icon: Mic },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/video", label: "Videos", icon: Video },
  { href: "/admin/event", label: "Events", icon: Calendar },
  { href: "/admin/announcement", label: "Announcements", icon: Megaphone },
  { href: "/admin/project", label: "Community Projects", icon: HeartHandshake },
  { href: "/admin/users", label: "Admin Users", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-gold text-background" : "text-cream/70 hover:bg-muted hover:text-cream"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        )
      })}
      <Link
        href="/"
        target="_blank"
        className="mt-4 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-cream/70 transition-colors hover:bg-muted hover:text-cream"
      >
        <ExternalLink className="h-4 w-4 shrink-0" />
        View website
      </Link>
    </nav>
  )
}
