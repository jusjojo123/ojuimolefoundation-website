// Shared content-type metadata used by both the admin dashboard and the
// public site. One unified `content` table; the `type` column selects which
// kind of content a row is.

export type ContentType =
  | "article"
  | "interview"
  | "documentary"
  | "news"
  | "event"
  | "project"
  | "video"
  | "gallery"

export type ContentTypeConfig = {
  type: ContentType
  label: string // singular
  plural: string
  /** Which optional fields are relevant when editing this type. */
  fields: {
    body: boolean
    excerpt: boolean
    coverImage: boolean
    videoUrl: boolean
    gallery: boolean
    location: boolean
    eventDate: boolean
  }
}

const base = {
  body: true,
  excerpt: true,
  coverImage: true,
  videoUrl: false,
  gallery: false,
  location: false,
  eventDate: false,
}

export const CONTENT_TYPES: Record<ContentType, ContentTypeConfig> = {
  article: { type: "article", label: "Article", plural: "Articles", fields: { ...base } },
  interview: { type: "interview", label: "Interview", plural: "Interviews", fields: { ...base } },
  documentary: {
    type: "documentary",
    label: "Documentary",
    plural: "Documentaries",
    fields: { ...base, videoUrl: true },
  },
  news: { type: "news", label: "News", plural: "News", fields: { ...base } },
  event: {
    type: "event",
    label: "Event",
    plural: "Events",
    fields: { ...base, location: true, eventDate: true, gallery: true },
  },
  project: {
    type: "project",
    label: "Community Project",
    plural: "Community Projects",
    fields: { ...base, location: true, gallery: true },
  },
  video: {
    type: "video",
    label: "Video",
    plural: "Videos",
    fields: { ...base, body: false, videoUrl: true },
  },
  gallery: {
    type: "gallery",
    label: "Gallery Photo",
    plural: "Gallery Photos",
    fields: {
      body: false,
      excerpt: true,
      coverImage: true,
      videoUrl: false,
      gallery: false,
      location: true,
      eventDate: false,
    },
  },
}

export const CONTENT_TYPE_LIST = Object.values(CONTENT_TYPES)

export const CATEGORIES = [
  "Education",
  "Healthcare",
  "Community",
  "Culture",
  "Advocacy",
  "Environment",
  "Youth",
  "Women & Girls",
  "Announcements",
  "General",
] as const

export function contentTypeLabel(type: string): string {
  return CONTENT_TYPES[type as ContentType]?.label ?? type
}
