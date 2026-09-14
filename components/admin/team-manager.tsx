"use client"

import Image from "next/image"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { MediaPicker } from "@/components/edit/media-picker"
import {
  saveLeadership,
  deleteLeadership,
  reorderLeadership,
  type LeadershipInput,
} from "@/app/actions/leadership"

type Member = {
  id: number
  name: string
  role: string
  description: string
  image: string | null
  imagePosition: string
  isFramed: boolean
  sortOrder: number
  status: string
}

const EMPTY: LeadershipInput = {
  name: "",
  role: "",
  description: "",
  image: null,
  imagePosition: "object-center",
  isFramed: true,
  status: "published",
}

export function TeamManager({
  members,
  canPublish,
  canDelete,
}: {
  members: Member[]
  canPublish: boolean
  canDelete: boolean
}) {
  const router = useRouter()
  const [editing, setEditing] = useState<LeadershipInput | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Member | null>(null)
  const [pending, startTransition] = useTransition()

  function openNew() {
    setError(null)
    setEditing({ ...EMPTY, status: canPublish ? "published" : "draft" })
  }

  function openEdit(m: Member) {
    setError(null)
    setEditing({
      id: m.id,
      name: m.name,
      role: m.role,
      description: m.description,
      image: m.image,
      imagePosition: m.imagePosition,
      isFramed: m.isFramed,
      status: m.status === "published" ? "published" : "draft",
    })
  }

  function save() {
    if (!editing) return
    setError(null)
    startTransition(async () => {
      const res = await saveLeadership(editing)
      if (!res.ok) {
        setError(res.error)
        return
      }
      setEditing(null)
      router.refresh()
    })
  }

  function move(id: number, direction: "up" | "down") {
    startTransition(async () => {
      await reorderLeadership(id, direction)
      router.refresh()
    })
  }

  function doDelete(id: number) {
    startTransition(async () => {
      const res = await deleteLeadership(id)
      if (!res.ok) setError(res.error)
      setConfirmDelete(null)
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-cream/50 text-sm">
          {members.length} member{members.length === 1 ? "" : "s"}
        </p>
        <button
          onClick={openNew}
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-background hover:bg-gold/90 transition-colors"
        >
          + Add Member
        </button>
      </div>

      {error && !editing && (
        <p className="rounded-md bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Member list */}
      <div className="flex flex-col gap-3">
        {members.map((m, i) => (
          <div
            key={m.id}
            className="flex items-center gap-4 rounded-lg border border-gold/10 bg-background/40 p-4"
          >
            <div className="flex flex-col gap-1">
              <button
                aria-label="Move up"
                disabled={i === 0 || pending}
                onClick={() => move(m.id, "up")}
                className="text-cream/40 hover:text-gold disabled:opacity-20 disabled:hover:text-cream/40"
              >
                ▲
              </button>
              <button
                aria-label="Move down"
                disabled={i === members.length - 1 || pending}
                onClick={() => move(m.id, "down")}
                className="text-cream/40 hover:text-gold disabled:opacity-20 disabled:hover:text-cream/40"
              >
                ▼
              </button>
            </div>

            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-gold/20 bg-card">
              {m.image ? (
                <Image
                  src={m.image}
                  alt={m.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-cream/30 text-xs">
                  N/A
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate font-medium text-cream">{m.name}</p>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${
                    m.status === "published"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-amber-500/15 text-amber-400"
                  }`}
                >
                  {m.status}
                </span>
              </div>
              <p className="truncate text-sm text-cream/50">{m.role}</p>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => openEdit(m)}
                className="rounded-md border border-gold/30 px-3 py-1.5 text-xs text-gold hover:bg-gold/10"
              >
                Edit
              </button>
              {canDelete && (
                <button
                  onClick={() => setConfirmDelete(m)}
                  className="rounded-md border border-red-500/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <p className="rounded-lg border border-dashed border-gold/20 p-8 text-center text-cream/40">
            No leadership members yet. Add the first one.
          </p>
        )}
      </div>

      {/* Editor modal */}
      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-gold/20 bg-card p-6">
            <h2 className="mb-4 font-heading text-xl text-cream">
              {editing.id ? "Edit member" : "Add member"}
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-gold/20 bg-background">
                  {editing.image ? (
                    <Image
                      src={editing.image}
                      alt="Selected"
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-cream/30 text-xs">
                      No photo
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setPickerOpen(true)}
                    className="rounded-md border border-gold/30 px-3 py-1.5 text-xs text-gold hover:bg-gold/10"
                  >
                    {editing.image ? "Change photo" : "Select photo"}
                  </button>
                  {editing.image && (
                    <button
                      onClick={() => setEditing({ ...editing, image: null })}
                      className="text-xs text-cream/40 hover:text-red-400"
                    >
                      Remove photo
                    </button>
                  )}
                </div>
              </div>

              <Field label="Name">
                <input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60"
                />
              </Field>

              <Field label="Role / Title">
                <input
                  value={editing.role}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                  className="w-full rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60"
                />
              </Field>

              <Field label="Biography">
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={5}
                  className="w-full resize-y rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60 leading-relaxed"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Photo style">
                  <select
                    value={editing.isFramed ? "framed" : "circle"}
                    onChange={(e) =>
                      setEditing({ ...editing, isFramed: e.target.value === "framed" })
                    }
                    className="w-full rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60"
                  >
                    <option value="framed">Framed (full image)</option>
                    <option value="circle">Circle crop</option>
                  </select>
                </Field>
                <Field label="Crop position">
                  <select
                    value={editing.imagePosition}
                    onChange={(e) => setEditing({ ...editing, imagePosition: e.target.value })}
                    disabled={editing.isFramed}
                    className="w-full rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60 disabled:opacity-40"
                  >
                    <option value="object-center">Center</option>
                    <option value="object-top">Top</option>
                    <option value="object-[center_20%]">Upper</option>
                    <option value="object-[center_15%]">Face (15%)</option>
                    <option value="object-bottom">Bottom</option>
                  </select>
                </Field>
              </div>

              <Field label="Status">
                <select
                  value={editing.status}
                  onChange={(e) =>
                    setEditing({ ...editing, status: e.target.value as "published" | "draft" })
                  }
                  className="w-full rounded bg-background border border-gold/20 px-3 py-2 text-cream outline-none focus:border-gold/60"
                >
                  <option value="draft">Draft (hidden from site)</option>
                  <option value="published" disabled={!canPublish}>
                    Published{canPublish ? "" : " (no permission)"}
                  </option>
                </select>
              </Field>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <div className="mt-2 flex justify-end gap-3">
                <button
                  onClick={() => setEditing(null)}
                  disabled={pending}
                  className="rounded-md border border-gold/20 px-4 py-2 text-sm text-cream/70 hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={pending}
                  className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-background hover:bg-gold/90 disabled:opacity-50"
                >
                  {pending ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>

          <MediaPicker
            open={pickerOpen}
            onClose={() => setPickerOpen(false)}
            onSelect={(url) => {
              setEditing((prev) => (prev ? { ...prev, image: url } : prev))
              setPickerOpen(false)
            }}
          />
        </div>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-xl border border-red-500/30 bg-card p-6">
            <h3 className="font-heading text-lg text-cream">Delete member?</h3>
            <p className="mt-2 text-sm text-cream/60">
              This will permanently remove <strong className="text-cream">{confirmDelete.name}</strong>{" "}
              from the leadership team. This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                disabled={pending}
                className="rounded-md border border-gold/20 px-4 py-2 text-sm text-cream/70 hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => doDelete(confirmDelete.id)}
                disabled={pending}
                className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
              >
                {pending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-wider text-cream/50">{label}</label>
      {children}
    </div>
  )
}
