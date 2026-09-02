"use client"

import { type ReactNode, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useEdit } from "./edit-context"
import { MediaPicker } from "./media-picker"
import { saveSiteContent, resetSiteContent } from "@/app/actions/site-content"

/**
 * Wraps an image (passed as children, rendered by the parent server component
 * from the resolved src) and adds a "Change image" affordance in edit mode.
 */
export function EditableImage({
  contentKey,
  children,
  className,
  label = "Change image",
  canReset = true,
}: {
  contentKey: string
  children: ReactNode
  className?: string
  label?: string
  canReset?: boolean
}) {
  const { canEdit, editMode } = useEdit()
  const router = useRouter()
  const [picking, setPicking] = useState(false)
  const [pending, startTransition] = useTransition()

  if (!canEdit || !editMode) {
    return <>{children}</>
  }

  function choose(url: string) {
    setPicking(false)
    startTransition(async () => {
      const res = await saveSiteContent(contentKey, "image", url)
      if (res.ok) router.refresh()
    })
  }

  function reset() {
    startTransition(async () => {
      const res = await resetSiteContent(contentKey)
      if (res.ok) router.refresh()
    })
  }

  return (
    <div className={`group/edit ${className ?? "relative"}`}>
      {children}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-black/50 opacity-0 group-hover/edit:opacity-100 transition-opacity rounded">
        <button
          type="button"
          onClick={() => setPicking(true)}
          disabled={pending}
          className="px-4 py-2 rounded bg-gold text-background text-xs font-heading uppercase tracking-wider hover:bg-gold-light transition-colors disabled:opacity-50"
        >
          {pending ? "Updating..." : label}
        </button>
        {canReset ? (
          <button
            type="button"
            onClick={reset}
            disabled={pending}
            className="text-[11px] text-cream/70 hover:text-red-300 uppercase tracking-wider"
          >
            Reset to default
          </button>
        ) : null}
      </div>
      <MediaPicker open={picking} onClose={() => setPicking(false)} onSelect={choose} />
    </div>
  )
}
