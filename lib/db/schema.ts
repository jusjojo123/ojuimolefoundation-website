import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  jsonb,
} from "drizzle-orm/pg-core"

// ---------------------------------------------------------------------------
// Better Auth tables (column names must stay camelCase to match Better Auth)
// ---------------------------------------------------------------------------
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  // Role-based access control: "admin" | "editor"
  role: text("role").notNull().default("editor"),
  // Admins must be activated before they can sign in
  active: boolean("active").notNull().default(false),
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
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

// ---------------------------------------------------------------------------
// CMS content tables
// ---------------------------------------------------------------------------

// Content types handled by the shared `content` table.
export const CONTENT_TYPES = [
  "article",
  "interview",
  "documentary",
  "news",
  "event",
  "project",
  "video",
] as const

export type ContentType = (typeof CONTENT_TYPES)[number]

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  excerpt: text("excerpt"),
  body: text("body"),
  category: text("category"),
  coverImage: text("coverImage"),
  videoUrl: text("videoUrl"),
  gallery: jsonb("gallery").notNull().default([]).$type<string[]>(),
  location: text("location"),
  eventDate: timestamp("eventDate"),
  status: text("status").notNull().default("draft"),
  featured: boolean("featured").notNull().default(false),
  authorId: text("authorId").notNull(),
  authorName: text("authorName"),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const galleryPhoto = pgTable("gallery_photo", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  caption: text("caption"),
  category: text("category"),
  imageUrl: text("imageUrl").notNull(),
  status: text("status").notNull().default("draft"),
  authorId: text("authorId").notNull(),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export type Content = typeof content.$inferSelect
export type GalleryPhoto = typeof galleryPhoto.$inferSelect
export type User = typeof user.$inferSelect
