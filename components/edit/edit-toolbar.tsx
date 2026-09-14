"use client"

import Link from "next/link"
import { useEdit } from "./edit-context"

export function EditToolbar() {
  const { canEdit, role, editMode, setEditMode } = useEdit()
  if (!canEdit) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-1.5rem)] sm:w-auto">
      <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-gold/30 bg-[#12100e]/95 backdrop-blur px-3 sm:px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <span className="hidden sm:flex items-center gap-2 pr-2 border-r border-gold/15">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-xs text-cream/70 tracking-wider">
            {role === "admin" ? "Admin" : "Editor"}
          </span>
        </span>

        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          aria-pressed={editMode}
          className={`px-4 py-2 rounded-full text-xs font-heading uppercase tracking-[0.15em] transition-all ${
            editMode
              ? "bg-gradient-to-r from-gold to-amber text-background shadow-[0_0_16px_rgba(201,162,39,0.4)]"
              : "bg-gold/10 text-gold hover:bg-gold/20"
          }`}
        >
          {editMode ? "Editing On" : "Edit Page"}
        </button>

        {editMode ? (
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="px-3 py-2 rounded-full text-xs uppercase tracking-wider text-cream/70 hover:text-cream border border-cream/15 hover:border-cream/30 transition-all"
          >
            Preview
          </button>
        ) : null}

        <Link
          href="/admin/dashboard"
          className="px-3 py-2 rounded-full text-xs uppercase tracking-wider text-cream/60 hover:text-gold transition-colors whitespace-nowrap"
        >
          Dashboard
        </Link>
      </div>

      {editMode ? (
        <p className="mt-2 text-center text-[11px] text-cream/50 px-3">
          Click any highlighted text or image to edit. Changes save to the site immediately.
        </p>
      ) : null}
    </div>
  )
}
