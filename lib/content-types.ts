import type { ContentType } from "@/app/actions/content"

export type FieldKey =
  | "description"
  | "body"
  | "image"
  | "video"
  | "location"
  | "eventDate"

export interface ContentTypeConfig {
  type: ContentType
  label: string // singular, e.g. "Article"
  plural: string // e.g. "Articles"
  description: string
  fields: FieldKey[]
}

export const CONTENT_TYPE_CONFIG: Record<ContentType, ContentTypeConfig> = {
  article: {
    type: "article",
    label: "Article",
    plural: "Articles",
    description: "Written stories, reports, and blog posts.",
    fields: ["description", "body", "image"],
  },
  interview: {
    type: "interview",
    label: "Interview",
    plural: "Interviews",
    description: "Conversations and Q&A features.",
    fields: ["description", "body", "image", "video"],
  },
  gallery: {
    type: "gallery",
    label: "Gallery Photo",
    plural: "Gallery Photos",
    description: "Photos for the gallery grid.",
    fields: ["description", "image"],
  },
  video: {
    type: "video",
    label: "Video",
    plural: "Videos",
    description: "Video links (YouTube, Vimeo, etc.).",
    fields: ["description", "video", "image"],
  },
  event: {
    type: "event",
    label: "Event",
    plural: "Events",
    description: "Upcoming and past events.",
    fields: ["description", "body", "image", "location", "eventDate"],
  },
  announcement: {
    type: "announcement",
    label: "Announcement",
    plural: "Announcements",
    description: "News and important notices.",
    fields: ["description", "body"],
  },
  project: {
    type: "project",
    label: "Community Project",
    plural: "Community Projects",
    description: "Initiatives and community work.",
    fields: ["description", "body", "image", "location"],
  },
}

export const CONTENT_TYPE_LIST = Object.values(CONTENT_TYPE_CONFIG)

export function getConfig(type: string): ContentTypeConfig | null {
  return CONTENT_TYPE_CONFIG[type as ContentType] ?? null
}
