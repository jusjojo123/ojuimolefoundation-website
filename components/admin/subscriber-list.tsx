"use client"

import { useState, useTransition } from "react"
import { removeSubscriber } from "@/app/actions/newsletter"
import type { NewsletterSubscriber } from "@/lib/db/schema"

export function SubscriberList({ initial }: { initial: NewsletterSubscriber[] }) {
  const [rows, setRows] = useState(initial)
  const [isPending, startTransition] = useTransition()

  function exportCsv() {
    const header = "email,name,status,source,subscribed_at\n"
    const body = rows
      .map((r) =>
        [
          r.email,
          (r.name ?? "").replace(/,/g, " "),
          r.status,
          r.source ?? "",
          new Date(r.createdAt).toISOString(),
        ].join(","),
      )
      .join("\n")
    const blob = new Blob([header + body], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-cream/40">
        No subscribers yet.
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-3">
        <button
          onClick={exportCsv}
          className="rounded-lg border border-gold/30 px-4 py-2 text-sm text-gold hover:bg-gold/10 transition-colors"
        >
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-card text-cream/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border">
                <td className="px-4 py-3 text-cream">{r.email}</td>
                <td className="px-4 py-3 text-cream/70">{r.name ?? "—"}</td>
                <td className="px-4 py-3 text-cream/50">{r.source ?? "—"}</td>
                <td className="px-4 py-3 text-cream/50">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    disabled={isPending}
                    onClick={() => {
                      if (!confirm(`Remove ${r.email}?`)) return
                      startTransition(async () => {
                        await removeSubscriber(r.id)
                        setRows((prev) => prev.filter((x) => x.id !== r.id))
                      })
                    }}
                    className="text-xs text-red-400/70 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
