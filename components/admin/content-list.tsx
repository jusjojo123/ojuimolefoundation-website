"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { togglePublished, deleteContent } from "@/app/actions/content"
import { AdminButton } from "@/components/admin/ui"
import type { ContentTypeConfig } from "@/lib/content-types"
import type { ContentItem } from "@/lib/db/schema"
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react"

export function ContentList({
  config,
  items,
}: {
  config: ContentTypeConfig
  items: ContentItem[]
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [busyId, setBusyId] = useState<number | null>(null)

  function handleToggle(item: ContentItem) {
    setBusyId(item.id)
    startTransition(async () => {
      await togglePublished(item.id, !item.published)
      router.refresh()
      setBusyId(null)
    })
  }

  function handleDelete(item: ContentItem) {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return
    setBusyId(item.id)
    startTransition(async () => {
      await deleteContent(item.id)
      router.refresh()
      setBusyId(null)
    })
  }

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl text-cream">{config.plural}</h1>
          <p className="mt-1 text-muted-foreground">{config.description}</p>
        </div>
        <Link href={`/admin/${config.type}/new`}>
          <AdminButton>
            <Plus className="h-4 w-4" />
            Add {config.label.toLowerCase()}
          </AdminButton>
        </Link>
      </header>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No {config.plural.toLowerCase()} yet.</p>
          <Link href={`/admin/${config.type}/new`} className="mt-3 inline-block text-gold hover:underline">
            Create your first one
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt=""
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-cream">{item.title}</p>
                {item.description && (
                  <p className="truncate text-sm text-muted-foreground">{item.description}</p>
                )}
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  item.published
                    ? "bg-gold/15 text-gold"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {item.published ? "Published" : "Draft"}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggle(item)}
                  disabled={pending && busyId === item.id}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs text-cream/80 transition-colors hover:bg-muted disabled:opacity-50"
                >
                  {item.published ? "Unpublish" : "Publish"}
                </button>
                <Link
                  href={`/admin/${config.type}/${item.id}`}
                  className="rounded-lg border border-border p-2 text-cream/80 transition-colors hover:bg-muted"
                  aria-label="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(item)}
                  disabled={pending && busyId === item.id}
                  className="rounded-lg border border-red-500/30 p-2 text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
