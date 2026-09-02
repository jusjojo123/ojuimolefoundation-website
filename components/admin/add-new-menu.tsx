"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { CONTENT_GROUPS } from "@/lib/content-config"

export function AddNewMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-md gold-gradient text-primary-foreground font-medium tracking-wide px-5 py-2.5 hover:opacity-90 transition-opacity"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        + Add New
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 max-h-[70vh] w-72 overflow-y-auto rounded-lg border border-border bg-card p-2 shadow-2xl"
        >
          {CONTENT_GROUPS.map((group) => (
            <div key={group.section} className="mb-1">
              <p className="px-2 py-1 text-[10px] uppercase tracking-wider text-cream/40">
                {group.section}
              </p>
              {group.types.map((t) => (
                <button
                  key={t.type}
                  role="menuitem"
                  onClick={() => {
                    setOpen(false)
                    router.push(`/admin/dashboard/new?type=${t.type}`)
                  }}
                  className="flex w-full flex-col items-start rounded-md px-2 py-1.5 text-left hover:bg-gold/10 transition-colors"
                >
                  <span className="text-sm text-cream">{t.label}</span>
                  <span className="text-xs text-cream/40">{t.description}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
