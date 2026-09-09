"use client"

import Link from "next/link"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useEdit } from "./edit-context"
import { EditModal } from "./edit-modal"
import { saveSiteContent } from "@/app/actions/site-content"

/**
 * An anchor/button whose label and destination are both editable. `labelKey`
 * stores the visible text; `hrefKey` stores the destination.
 */
export function EditableLink({
  labelKey,
  hrefKey,
  label,
  href,
  className,
}: {
  labelKey: string
  hrefKey: string
  label: string
  href: string
  className?: string
}) {
  const { canEdit, editMode } = useEdit()
  const router = useRouter()
  const [curLabel, setCurLabel] = useState(label)
  const [curHref, setCurHref] = useState(href)
  const [open, setOpen] = useState(false)
  const [draftLabel, setDraftLabel] = useState(label)
  const [draftHref, setDraftHref] = useState(href)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  if (!canEdit || !editMode) {
    return (
      <Link href={curHref} className={className}>
        {curLabel}
      </Link>
    )
  }

  function openEditor() {
    setDraftLabel(curLabel)
    setDraftHref(curHref)
    setError(null)
    setOpen(true)
  }

  function save() {
    setError(null)
    startTransition(async () => {
      const r1 = await saveSiteContent(labelKey, "text", draftLabel)
      const r2 = await saveSiteContent(hrefKey, "text", draftHref)
      if (!r1.ok || !r2.ok) {
        setError((!r1.ok && r1.error) || (!r2.ok && r2.error) || "Save failed.")
        return
      }
      setCurLabel(draftLabel)
      setCurHref(draftHref)
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={openEditor}
        className={`${className} cursor-pointer outline-dashed outline-1 outline-gold/40 hover:outline-gold hover:outline-2`}
        title="Click to edit link"
      >
        {curLabel}
      </button>

      <EditModal
        open={open}
        title="Edit button / link"
        onClose={() => setOpen(false)}
        onSave={save}
        saving={pending}
        error={error}
      >
        <div>
          <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">
            Label
          </label>
          <input
            type="text"
            value={draftLabel}
            onChange={(e) => setDraftLabel(e.target.value)}
            autoFocus
            className="w-full rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">
            Destination (URL or #section)
          </label>
          <input
            type="text"
            value={draftHref}
            onChange={(e) => setDraftHref(e.target.value)}
            className="w-full rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60"
          />
        </div>
      </EditModal>
    </>
  )
}
