"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type EditContextValue = {
  /** True only for signed-in admin/editor users. */
  canEdit: boolean
  role: "admin" | "editor" | null
  /** Whether edit mode is currently active (toggled from the toolbar). */
  editMode: boolean
  setEditMode: (on: boolean) => void
}

const EditContext = createContext<EditContextValue>({
  canEdit: false,
  role: null,
  editMode: false,
  setEditMode: () => {},
})

export function useEdit() {
  return useContext(EditContext)
}

export function EditProvider({
  canEdit,
  role,
  children,
}: {
  canEdit: boolean
  role: "admin" | "editor" | null
  children: ReactNode
}) {
  const [editMode, setEditMode] = useState(false)

  return (
    <EditContext.Provider value={{ canEdit, role, editMode, setEditMode }}>
      {children}
    </EditContext.Provider>
  )
}
