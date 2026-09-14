import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const statements = [
  // --- user: per-editor permission flags ---
  `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "canPublish" boolean NOT NULL DEFAULT false`,
  `ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "canDelete" boolean NOT NULL DEFAULT false`,

  // --- content: new fields ---
  `ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "audioUrl" text`,
  `ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "documentUrl" text`,
  `ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "tags" jsonb NOT NULL DEFAULT '[]'::jsonb`,
  `ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "publishDate" timestamp`,
  `ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "seoTitle" text`,
  `ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "seoDescription" text`,
  `ALTER TABLE "content" ADD COLUMN IF NOT EXISTS "socialImage" text`,

  // --- media library ---
  `CREATE TABLE IF NOT EXISTS "media" (
    "id" serial PRIMARY KEY,
    "url" text NOT NULL,
    "pathname" text,
    "kind" text NOT NULL DEFAULT 'image',
    "filename" text,
    "title" text,
    "alt" text,
    "tags" jsonb NOT NULL DEFAULT '[]'::jsonb,
    "size" integer,
    "contentType" text,
    "uploadedById" text,
    "createdAt" timestamp NOT NULL DEFAULT now()
  )`,

  // --- newsletter ---
  `CREATE TABLE IF NOT EXISTS "newsletter_subscriber" (
    "id" serial PRIMARY KEY,
    "email" text NOT NULL UNIQUE,
    "name" text,
    "status" text NOT NULL DEFAULT 'active',
    "source" text,
    "createdAt" timestamp NOT NULL DEFAULT now()
  )`,

  // Existing admins should retain full rights.
  `UPDATE "user" SET "canPublish" = true, "canDelete" = true WHERE "role" = 'admin'`,
]

const run = async () => {
  const client = await pool.connect()
  try {
    for (const sql of statements) {
      await client.query(sql)
      console.log("[migrate] ok:", sql.slice(0, 60).replace(/\s+/g, " "))
    }
    console.log("[migrate] complete")
  } finally {
    client.release()
    await pool.end()
  }
}

run().catch((err) => {
  console.error("[migrate] failed:", err)
  process.exit(1)
})
