import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  configForPath,
  getPublishedForPath,
  allSectionPaths,
} from "@/lib/public-content"
import { PageShell } from "@/components/public/page-shell"
import { ContentCard } from "@/components/public/content-card"
import { SITE_NAME, SITE_URL } from "@/lib/site"

type Params = { section: string }

export const revalidate = 300

export async function generateStaticParams() {
  return allSectionPaths().map((section) => ({ section }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { section } = await params
  const cfg = configForPath(section)
  if (!cfg) return { title: "Not found" }
  const title = `${cfg.plural} | ${SITE_NAME}`
  return {
    title,
    description: cfg.description,
    alternates: { canonical: `/${section}` },
    openGraph: {
      title,
      description: cfg.description,
      url: `${SITE_URL}/${section}`,
      siteName: SITE_NAME,
      type: "website",
    },
  }
}

export default async function SectionPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { section } = await params
  const cfg = configForPath(section)
  if (!cfg) notFound()

  const items = await getPublishedForPath(section)

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <nav className="mb-6 flex items-center gap-2 text-xs text-cream/40" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold">Home</Link>
          <span aria-hidden>/</span>
          <span className="text-cream/60">{cfg.plural}</span>
        </nav>

        <header className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gold/70">{cfg.section}</p>
          <h1 className="mt-3 font-heading text-4xl text-cream text-balance">{cfg.plural}</h1>
          <p className="mt-4 text-cream/60 leading-relaxed text-pretty">{cfg.description}</p>
        </header>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gold/20 py-20 text-center">
            <p className="text-cream/50">Nothing published here yet. Please check back soon.</p>
            <Link href="/" className="mt-3 inline-block text-sm text-gold hover:underline">
              Return home
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  )
}
