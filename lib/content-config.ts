// Shared content-type metadata used by both the admin dashboard and the
// public site. One unified `content` table; the `type` column selects which
// kind of content a row is.

export type ContentType =
  | "article"
  | "news"
  | "culture"
  | "documentary"
  | "interview"
  | "oral-history"
  | "event"
  | "outreach"
  | "charity"
  | "youth"
  | "gallery"
  | "video"
  | "audio"
  | "document"
  | "announcement"
  | "leader"
  | "partner"
  | "testimonial"
  | "campaign"

export type ContentStatus = "draft" | "published" | "archived"

export type ContentFieldFlags = {
  body: boolean
  /** When true, the body uses the rich-text editor; otherwise a plain textarea. */
  richText: boolean
  excerpt: boolean
  coverImage: boolean
  videoUrl: boolean
  audioUrl: boolean
  documentUrl: boolean
  gallery: boolean
  location: boolean
  eventDate: boolean
  author: boolean
}

export type ContentTypeConfig = {
  type: ContentType
  label: string // singular
  plural: string
  /** Public section this content belongs to (used for grouping + navigation). */
  section: string
  /** URL base path for public per-item pages: /{path}/{slug}. */
  path: string
  /** Short description shown in the Add-New menu. */
  description: string
  fields: ContentFieldFlags
}

const base: ContentFieldFlags = {
  body: true,
  richText: true,
  excerpt: true,
  coverImage: true,
  videoUrl: false,
  audioUrl: false,
  documentUrl: false,
  gallery: false,
  location: false,
  eventDate: false,
  author: true,
}

export const CONTENT_TYPES: Record<ContentType, ContentTypeConfig> = {
  article: {
    type: "article",
    label: "Article",
    plural: "Articles",
    section: "Articles & News",
    path: "articles",
    description: "Long-form written articles.",
    fields: { ...base, gallery: true },
  },
  news: {
    type: "news",
    label: "News",
    plural: "News",
    section: "Articles & News",
    path: "news",
    description: "Timely news updates.",
    fields: { ...base },
  },
  culture: {
    type: "culture",
    label: "Culture & Heritage",
    plural: "Culture & Heritage",
    section: "Culture & Heritage",
    path: "culture",
    description: "Cultural articles and educational content.",
    fields: { ...base, gallery: true },
  },
  documentary: {
    type: "documentary",
    label: "Documentary",
    plural: "Documentaries",
    section: "Documentaries",
    path: "documentaries",
    description: "Film documentaries with video.",
    fields: { ...base, videoUrl: true, gallery: true },
  },
  interview: {
    type: "interview",
    label: "Interview",
    plural: "Interviews",
    section: "Interviews",
    path: "interviews",
    description: "Recorded or written interviews.",
    fields: { ...base, videoUrl: true, audioUrl: true },
  },
  "oral-history": {
    type: "oral-history",
    label: "Oral History",
    plural: "Oral Histories",
    section: "Oral Histories",
    path: "oral-histories",
    description: "Audio/video oral history records.",
    fields: { ...base, videoUrl: true, audioUrl: true, gallery: true },
  },
  event: {
    type: "event",
    label: "Cultural Event",
    plural: "Cultural Events",
    section: "Events",
    path: "events",
    description: "Cultural events with date and location.",
    fields: { ...base, location: true, eventDate: true, gallery: true },
  },
  outreach: {
    type: "outreach",
    label: "Community Outreach",
    plural: "Community Outreach",
    section: "Community Outreach",
    path: "outreach",
    description: "Outreach activities and programmes.",
    fields: { ...base, location: true, gallery: true },
  },
  charity: {
    type: "charity",
    label: "Charity Project",
    plural: "Charity Projects",
    section: "Charity Projects",
    path: "projects",
    description: "Charitable projects and initiatives.",
    fields: { ...base, location: true, gallery: true },
  },
  youth: {
    type: "youth",
    label: "Youth Programme",
    plural: "Youth Programmes",
    section: "Youth Programmes",
    path: "youth",
    description: "Programmes for young people.",
    fields: { ...base, location: true, gallery: true },
  },
  gallery: {
    type: "gallery",
    label: "Photo Gallery",
    plural: "Photo Galleries",
    section: "Galleries",
    path: "galleries",
    description: "Collections of photos.",
    fields: {
      ...base,
      body: false,
      gallery: true,
      location: true,
    },
  },
  video: {
    type: "video",
    label: "Video",
    plural: "Videos",
    section: "Videos",
    path: "videos",
    description: "Single video posts.",
    fields: { ...base, body: false, videoUrl: true },
  },
  audio: {
    type: "audio",
    label: "Audio Recording",
    plural: "Audio Recordings",
    section: "Audio",
    path: "audio",
    description: "Podcasts, music, and recordings.",
    fields: { ...base, audioUrl: true },
  },
  document: {
    type: "document",
    label: "Document / PDF",
    plural: "Documents",
    section: "Documents",
    path: "documents",
    description: "Downloadable documents and PDFs.",
    fields: { ...base, documentUrl: true },
  },
  announcement: {
    type: "announcement",
    label: "Announcement",
    plural: "Announcements",
    section: "Announcements",
    path: "announcements",
    description: "Public announcements and notices.",
    fields: { ...base },
  },
  leader: {
    type: "leader",
    label: "Leadership Profile",
    plural: "Leadership",
    section: "Leadership",
    path: "leadership",
    description: "Profiles of leaders and staff.",
    fields: { ...base, author: false },
  },
  partner: {
    type: "partner",
    label: "Partner / Sponsor",
    plural: "Partners & Sponsors",
    section: "Partners & Sponsors",
    path: "partners",
    description: "Partner and sponsor profiles.",
    fields: { ...base, author: false, videoUrl: false },
  },
  testimonial: {
    type: "testimonial",
    label: "Testimonial",
    plural: "Testimonials",
    section: "Testimonials",
    path: "testimonials",
    description: "Quotes and testimonials.",
    fields: { ...base, gallery: false },
  },
  campaign: {
    type: "campaign",
    label: "Donation Campaign",
    plural: "Donation Campaigns",
    section: "Donation Campaigns",
    path: "campaigns",
    description: "Fundraising campaign pages.",
    fields: { ...base, gallery: true },
  },
}

export const CONTENT_TYPE_LIST = Object.values(CONTENT_TYPES)

/** Content types grouped by section for the Add-New menu. */
export const CONTENT_GROUPS: { section: string; types: ContentTypeConfig[] }[] =
  (() => {
    const seen: string[] = []
    const groups: { section: string; types: ContentTypeConfig[] }[] = []
    for (const cfg of CONTENT_TYPE_LIST) {
      let group = groups.find((g) => g.section === cfg.section)
      if (!group) {
        group = { section: cfg.section, types: [] }
        groups.push(group)
        seen.push(cfg.section)
      }
      group.types.push(cfg)
    }
    return groups
  })()

export const CATEGORIES = [
  "Education",
  "Healthcare",
  "Community",
  "Culture",
  "Heritage",
  "Advocacy",
  "Environment",
  "Youth",
  "Women & Girls",
  "Faith & Spirituality",
  "Announcements",
  "General",
] as const

export function contentTypeConfig(type: string): ContentTypeConfig | undefined {
  return CONTENT_TYPES[type as ContentType]
}

export function contentTypeLabel(type: string): string {
  return CONTENT_TYPES[type as ContentType]?.label ?? type
}

export function contentTypePath(type: string): string {
  return CONTENT_TYPES[type as ContentType]?.path ?? "articles"
}

export function isValidContentType(type: string): type is ContentType {
  return type in CONTENT_TYPES
}
