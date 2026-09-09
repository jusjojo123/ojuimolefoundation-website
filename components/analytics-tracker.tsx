"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

function getSessionId(): string {
  try {
    const KEY = "oi_sid"
    let id = sessionStorage.getItem(KEY)
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36)
      sessionStorage.setItem(KEY, id)
    }
    return id
  } catch {
    return "anon"
  }
}

/**
 * Records a first-party page view on each client navigation. Fires a
 * lightweight POST to /api/track. Admin/API paths are ignored server-side.
 */
export function AnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return
    const payload = JSON.stringify({ path: pathname, sessionId: getSessionId() })
    try {
      // Prefer fetch (keepalive) so we can set JSON headers reliably.
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    } catch {
      /* no-op */
    }
  }, [pathname])

  return null
}
