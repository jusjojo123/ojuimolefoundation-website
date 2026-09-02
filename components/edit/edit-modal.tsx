"use client"

import { type ReactNode, useEffect } from "react"

export function EditModal({
  open,
  title,
  children,
  onClose,
  onSave,
  onReset,
  saving,
  error,
  saveLabel = "Save",
}: {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  onSave: () => void
  onReset?: () => void
  saving?: boolean
  error?: string | null
  saveLabel?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-[#12100e] border border-gold/30 rounded-t-2xl sm:rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gold/15 sticky top-0 bg-[#12100e]">
          <h2 className="font-heading text-lg text-gold tracking-wide">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-cream/50 hover:text-cream transition-colors text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="px-5 py-5 space-y-4">{children}</div>

        {error ? (
          <p className="px-5 -mt-2 mb-3 text-sm text-red-400">{error}</p>
        ) : null}

        <div className="flex items-center gap-3 px-5 py-4 border-t border-gold/15 sticky bottom-0 bg-[#12100e]">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="px-5 py-2.5 rounded bg-gradient-to-r from-gold to-amber text-background font-heading text-xs tracking-[0.15em] uppercase hover:shadow-[0_0_20px_rgba(201,162,39,0.35)] transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : saveLabel}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-5 py-2.5 rounded border border-cream/20 text-cream/70 text-xs tracking-[0.15em] uppercase hover:border-cream/40 hover:text-cream transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          {onReset ? (
            <button
              type="button"
              onClick={onReset}
              disabled={saving}
              className="ml-auto text-xs text-cream/40 hover:text-red-400 transition-colors uppercase tracking-wider"
            >
              Reset to default
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
