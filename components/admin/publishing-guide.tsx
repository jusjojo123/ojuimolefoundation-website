import Link from "next/link"

const STEPS = [
  { title: "Upload media", text: "Add photos, videos, audio or documents to the Media Library (or upload directly inside the editor)." },
  { title: "Create content", text: "Click Add New and choose News, Article, Interview, Documentary or Event." },
  { title: "Select media", text: "In the Media section, click “Choose from Media Library” to attach a file you already uploaded." },
  { title: "Publish", text: "Click Publish. “Save Draft” keeps it private and hidden from the public site." },
  { title: "It goes live", text: "The item appears on its public page, e.g. /news, /articles, /interviews, /documentaries or /events." },
]

export function PublishingGuide({ note }: { note?: string }) {
  return (
    <section aria-labelledby="publishing-guide-heading" className="rounded-lg border border-gold/20 bg-card/60 p-4 sm:p-5">
      <h2 id="publishing-guide-heading" className="text-sm font-medium tracking-wide text-gold">
        How publishing works
      </h2>
      {note && <p className="mt-1 text-xs text-cream/50 leading-relaxed">{note}</p>}
      <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-3 lg:flex-col lg:gap-1.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/40 text-xs text-gold">
              {i + 1}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm text-cream">{s.title}</span>
              <span className="text-xs text-cream/50 leading-relaxed">{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        <Link href="/admin/dashboard/media" className="text-gold hover:underline">Open Media Library</Link>
        <Link href="/admin/dashboard/new" className="text-gold hover:underline">Create new content</Link>
      </div>
    </section>
  )
}
