"use client"

import {
  createElement,
  useState,
  useTransition,
  type ElementType,
} from "react"
import { useRouter } from "next/navigation"
import { useEdit } from "./edit-context"
import { EditModal } from "./edit-modal"
import { saveSiteContent, resetSiteContent } from "@/app/actions/site-content"

export function EditableText({
  contentKey,
  value,
  as = "span",
  className,
  multiline = false,
  label = "Edit text",
}: {
  contentKey: string
  value: string
  as?: ElementType
  className?: string
  multiline?: boolean
  label?: string
}) {
  const { canEdit, editMode } = useEdit()
  const router = useRouter()
  const [current, setCurrent] = useState(value)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(value)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  // Public visitors (and edit mode off) get clean, non-interactive markup.
  if (!canEdit || !editMode) {
    return createElement(
      as,
      { className, style: multiline ? { whiteSpace: "pre-line" } : undefined },
      current,
    )
  }

  function openEditor() {
    setDraft(current)
    setError(null)
    setOpen(true)
  }

  function save() {
    setError(null)
    startTransition(async () => {
      const res = await saveSiteContent(contentKey, "text", draft)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setCurrent(draft)
      setOpen(false)
      router.refresh()
    })
  }

  function reset() {
    startTransition(async () => {
      const res = await resetSiteContent(contentKey)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <>
      {createElement(
        as,
        {
          className: `${className ?? ""} cursor-pointer rounded outline-dashed outline-1 outline-gold/40 hover:outline-gold hover:outline-2 transition-all`,
          style: multiline ? { whiteSpace: "pre-line" } : undefined,
          onClick: (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            openEditor()
          },
          title: "Click to edit",
          "data-editable-key": contentKey,
        },
        current || "Empty — click to edit",
      )}

      <EditModal
        open={open}
        title={label}
        onClose={() => setOpen(false)}
        onSave={save}
        onReset={reset}
        saving={pending}
        error={error}
      >
        <label className="block text-xs uppercase tracking-wider text-cream/50 mb-2">
          Content
        </label>
        {multiline ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={6}
            autoFocus
            className="w-full rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60 resize-y leading-relaxed"
          />
        ) : (
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            className="w-full rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60"
          />
        )}
      </EditModal>
    </>
  )
}
