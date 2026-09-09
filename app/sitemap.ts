import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { allPublishedSlugs, sectionsWithContent } from "@/lib/public-content"
import { contentTypePath } from "@/lib/content-config"

export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]

  try {
    const sections = await sectionsWithContent()
    for (const s of sections) {
      entries.push({
        url: `${SITE_URL}/${s.path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })
    }

    const items = await allPublishedSlugs()
    for (const item of items) {
      entries.push({
        url: `${SITE_URL}/${contentTypePath(item.type)}/${item.slug}`,
        lastModified: item.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
      })
    }
  } catch (err) {
    console.log("[v0] sitemap generation failed:", err)
  }

  return entries
}
