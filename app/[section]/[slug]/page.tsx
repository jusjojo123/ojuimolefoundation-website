import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  configForPath,
  getPublishedBySlug,
  getRelated,
  allPublishedSlugs,
} from "@/lib/public-content"
import { contentTypePath } from "@/lib/content-config"
import { PageShell } from "@/components/public/page-shell"
import { ContentDetail } from "@/components/public/content-detail"
import { ContentCard } from "@/components/public/content-card"
import { SITE_NAME, SITE_URL, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/site"

type Params = { section: string; slug: string }

export const revalidate = 300

export async function generateStaticParams() {
  const rows = await allPublishedSlugs()
  return rows.map((r) => ({ section: contentTypePath(r.type), slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await getPublishedBySlug(slug)
  if (!item) return { title: "Not found" }

  const title = item.seoTitle || item.title
  const description = item.seoDescription || item.excerpt || undefined
  const image = item.socialImage || item.coverImage || item.gallery?.[0]?.url || DEFAULT_OG_IMAGE
  const url = `${SITE_URL}/${contentTypePath(item.type)}/${item.slug}`

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: { canonical: `/${contentTypePath(item.type)}/${item.slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: SITE_NAME,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(image)],
    },
  }
}

export default async function ContentItemPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { section, slug } = await params
  const cfg = configForPath(section)
  if (!cfg) notFound()

  const item = await getPublishedBySlug(slug)
  if (!item || contentTypePath(item.type) !== section) notFound()

  const related = await getRelated(item.type, item.id, 3)
  const shareUrl = `${SITE_URL}/${section}/${item.slug}`

  const image = item.socialImage || item.coverImage || item.gallery?.[0]?.url || DEFAULT_OG_IMAGE
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.seoDescription || item.excerpt || undefined,
    image: absoluteUrl(image),
    datePublished: item.publishedAt ?? item.createdAt,
    dateModified: item.updatedAt,
    author: { "@type": "Organization", name: item.authorName || SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") },
    },
    mainEntityOfPage: shareUrl,
  }

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mx-auto max-w-3xl px-4 pt-8 sm:px-6" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/40">
          <li><Link href="/" className="hover:text-gold">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={`/${section}`} className="hover:text-gold">{cfg.plural}</Link></li>
        </ol>
      </nav>

      <ContentDetail item={item} shareUrl={shareUrl} />

      {related.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          <h2 className="mb-6 font-heading text-2xl text-cream">More {cfg.plural}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ContentCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </PageShell>
  )
}
