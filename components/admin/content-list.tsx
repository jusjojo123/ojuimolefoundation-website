"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import Link from "next/link"
import {
  deleteContent,
  setPublishStatus,
  toggleFeatured,
} from "@/app/actions/content"
import { CONTENT_TYPE_LIST, contentTypeLabel } from "@/lib/content-config"
import type { Content } from "@/lib/db/schema"

type Props = {
  items: Content[]
  role: "admin" | "editor"
  filters: { type: string; status: string; q: string }
}

export function ContentList({ items, role, filters }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [q, setQ] = useState(filters.q)

  function applyFilters(next: Partial<{ type: string; status: string; q: string }>) {
    const merged = { ...filters, q, ...next }
    const params = new URLSearchParams()
    if (merged.type && merged.type !== "all") params.set("type", merged.type)
    if (merged.status && merged.status !== "all") params.set("status", merged.status)
    if (merged.q?.trim()) params.set("q", merged.q.trim())
    router.push(`/admin/dashboard${params.toString() ? `?${params}` : ""}`)
  }

  function action(fn: () => Promise<unknown>) {
    startTransition(async () => {
      await fn()
      router.refresh()
    })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            applyFilters({ q })
          }}
          className="flex-1"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, summary, or category…"
            className="w-full rounded-md bg-card border border-border px-4 py-2.5 text-cream outline-none focus:border-gold/60 transition-colors"
          />
        </form>
        <select
          value={filters.type}
          onChange={(e) => applyFilters({ type: e.target.value })}
          className="rounded-md bg-card border border-border px-3 py-2.5 text-cream outline-none focus:border-gold/60"
        >
          <option value="all">All types</option>
          {CONTENT_TYPE_LIST.map((c) => (
            <option key={c.type} value={c.type}>
              {c.plural}
            </option>
          ))}
        </select>
        <select
          value={filters.status}
          onChange={(e) => applyFilters({ status: e.target.value })}
          className="rounded-md bg-card border border-border px-3 py-2.5 text-cream outline-none focus:border-gold/60"
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <p className="text-cream/50">No content found.</p>
          <Link href="/admin/dashboard/new" className="text-gold hover:underline text-sm mt-2 inline-block">
            Create your first item →
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-lg bg-card border border-border px-4 py-3 hover:border-gold/30 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wider text-gold/70 bg-gold/10 rounded px-1.5 py-0.5">
                    {contentTypeLabel(item.type)}
                  </span>
                  <StatusBadge status={item.status} />
                  {item.featured && (
                    <span className="text-[10px] uppercase tracking-wider text-bronze bg-bronze/10 rounded px-1.5 py-0.5">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-cream mt-1 truncate">{item.title}</p>
                {item.category && (
                  <p className="text-xs text-cream/40">{item.category}</p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/admin/dashboard/edit/${item.id}`}
                  className="text-sm text-cream/70 hover:text-gold transition-colors px-2"
                >
                  Edit
                </Link>
                {item.status === "published" ? (
                  <button
                    onClick={() => action(() => setPublishStatus(item.id, "draft"))}
                    disabled={isPending}
                    className="text-sm text-cream/70 hover:text-gold transition-colors px-2 disabled:opacity-50"
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={() => action(() => setPublishStatus(item.id, "published"))}
                    disabled={isPending}
                    className="text-sm text-gold hover:opacity-80 transition-opacity px-2 disabled:opacity-50"
                  >
                    Publish
                  </button>
                )}
                <button
                  onClick={() => action(() => toggleFeatured(item.id, !item.featured))}
                  disabled={isPending}
                  className="text-sm text-cream/50 hover:text-bronze transition-colors px-2 disabled:opacity-50"
                >
                  {item.featured ? "Unfeature" : "Feature"}
                </button>
                {role === "admin" && (
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${item.title}"? This cannot be undone.`)) {
                        action(() => deleteContent(item.id))
                      }
                    }}
                    disabled={isPending}
                    className="text-sm text-red-400/80 hover:text-red-400 transition-colors px-2 disabled:opacity-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const published = status === "published"
  return (
    <span
      className={`text-[10px] uppercase tracking-wider rounded px-1.5 py-0.5 ${
        published ? "text-green-400 bg-green-500/10" : "text-cream/50 bg-muted"
      }`}
    >
      {published ? "Published" : "Draft"}
    </span>
  )
}
