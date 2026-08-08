import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  integer,
  jsonb,
} from "drizzle-orm/pg-core"

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  // Role-based permissions: "admin" or "editor".
  role: text("role").notNull().default("editor"),
  // Per-editor permission flags (admins always have both regardless).
  canPublish: boolean("canPublish").notNull().default(false),
  canDelete: boolean("canDelete").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Single unified content table. The `type` column distinguishes articles,
// interviews, documentaries, news, events, community projects, videos and
// gallery photos so every content kind shares one editing pipeline.

export type GalleryImage = { url: string; alt?: string }

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  // See lib/content-config.ts for the full list of content types.
  type: text("type").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  excerpt: text("excerpt"),
  body: text("body"),
  category: text("category"),
  coverImage: text("coverImage"),
  videoUrl: text("videoUrl"),
  audioUrl: text("audioUrl"),
  documentUrl: text("documentUrl"),
  gallery: jsonb("gallery").$type<GalleryImage[]>().notNull().default([]),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  location: text("location"),
  eventDate: timestamp("eventDate"),
  publishDate: timestamp("publishDate"),
  // SEO + social metadata
  seoTitle: text("seoTitle"),
  seoDescription: text("seoDescription"),
  socialImage: text("socialImage"),
  // draft | published | archived
  status: text("status").notNull().default("draft"),
  featured: boolean("featured").notNull().default(false),
  authorId: text("authorId").notNull(),
  authorName: text("authorName"),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export type Content = typeof content.$inferSelect
export type NewContent = typeof content.$inferInsert

// --- Media library ---------------------------------------------------------

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  pathname: text("pathname"),
  // image | video | audio | document
  kind: text("kind").notNull().default("image"),
  filename: text("filename"),
  title: text("title"),
  alt: text("alt"),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  size: serial("size"),
  contentType: text("contentType"),
  uploadedById: text("uploadedById"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type Media = typeof media.$inferSelect

// --- Newsletter ------------------------------------------------------------

export const newsletterSubscriber = pgTable("newsletter_subscriber", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  // active | unsubscribed
  status: text("status").notNull().default("active"),
  source: text("source"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export type NewsletterSubscriber = typeof newsletterSubscriber.$inferSelect
