import pg from "pg"

const { Pool } = pg

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const statements = [
  // --- site_content: key/value overrides for inline-editable page copy -----
  `CREATE TABLE IF NOT EXISTS public.site_content (
     key text PRIMARY KEY,
     type text NOT NULL DEFAULT 'text',
     value text NOT NULL DEFAULT '',
     "updatedById" text,
     "updatedByName" text,
     "updatedAt" timestamp NOT NULL DEFAULT now()
   )`,

  // --- content: audit + ordering + per-type meta ---------------------------
  `ALTER TABLE public.content ADD COLUMN IF NOT EXISTS "sortOrder" integer NOT NULL DEFAULT 0`,
  `ALTER TABLE public.content ADD COLUMN IF NOT EXISTS "updatedById" text`,
  `ALTER TABLE public.content ADD COLUMN IF NOT EXISTS "updatedByName" text`,
  `ALTER TABLE public.content ADD COLUMN IF NOT EXISTS meta jsonb NOT NULL DEFAULT '{}'::jsonb`,

  // --- pageview: first-party analytics -------------------------------------
  `CREATE TABLE IF NOT EXISTS public.pageview (
     id serial PRIMARY KEY,
     path text NOT NULL,
     referrer text,
     source text,
     country text,
     device text,
     "sessionId" text,
     "createdAt" timestamp NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS pageview_created_idx ON public.pageview ("createdAt")`,
  `CREATE INDEX IF NOT EXISTS pageview_path_idx ON public.pageview (path)`,
  `CREATE INDEX IF NOT EXISTS content_type_sort_idx ON public.content (type, "sortOrder")`,
]

// Current leadership team (mirrors components/leadership.tsx exactly) so the
// section looks identical but becomes CMS-managed.
const leadership = [
  {
    name: "Ifagbejami Jolene Smart",
    role: "Founder and Executive Director",
    description:
      "Leads the overall vision and direction of Ojú Imọ̀lẹ̀ Media Foundation. Oversees media production, storytelling, and cultural documentation, ensuring the foundation remains aligned with its mission of illuminating culture and empowering communities.",
    image: "/images/jolene-smart-leadership.jpg",
    meta: { imagePosition: "object-center", isFramed: true },
  },
  {
    name: "Olumbe Diaz",
    role: "Director of Cultural Affairs and Strategic Development",
    description:
      "Responsible for cultural preservation, strategic planning, and organizational development. Brings extensive experience in cultural work and supports the foundation in building strong cultural programs and long term growth.",
    image: "/images/olumbe-diaz.jpg",
    meta: { imagePosition: "object-center", isFramed: true },
  },
  {
    name: "Keisha Smart Ellis",
    role: "Director of Charity and Community Outreach",
    description:
      "Leads all humanitarian and charity initiatives. Oversees community outreach programs, support services, and initiatives focused on assisting families, youth, and vulnerable members of the community.",
    image: "/images/keisha-smart-ellis.jpg",
    meta: { imagePosition: "object-center", isFramed: true },
  },
  {
    name: "Ọmọlẹ̀yẹ Afiya Diaz",
    role: "Director of Education, Culture, and Media Support",
    description:
      "An educator and cultural advocate responsible for educational programs, cultural development initiatives, and supporting media production efforts within the foundation. Plays an active role in storytelling and creative documentation.",
    image: "/images/afiya-diaz.jpg",
    meta: { imagePosition: "object-[center_20%]", isFramed: false },
  },
  {
    name: "Yannick Finch",
    role: "Director of Youth Development and Empowerment",
    description:
      "Responsible for youth engagement, mentorship, empowerment initiatives, and community development programs within the foundation. Supports activities focused on inspiring young people through culture, education, leadership, creativity, media, and positive community involvement while helping to build the next generation of empowered leaders.",
    image: "/images/yannick-finch.jpg",
    meta: { imagePosition: "object-[center_15%]", isFramed: false },
  },
]

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

async function run() {
  const client = await pool.connect()
  try {
    for (const sql of statements) {
      await client.query(sql)
    }
    console.log("schema statements applied")

    // Seed leadership only if none exists yet.
    const existing = await client.query(
      "select count(*)::int as n from content where type = 'leadership'",
    )
    if (existing.rows[0].n === 0) {
      // Use the first admin as author, else any user.
      const admin = await client.query(
        `select id, name from "user" order by (role = 'admin') desc, "createdAt" asc limit 1`,
      )
      const author = admin.rows[0] || { id: "system", name: "System" }
      const now = new Date()
      let order = 0
      for (const m of leadership) {
        await client.query(
          `insert into content
             (type, title, slug, excerpt, body, category, "coverImage", gallery, tags, meta,
              status, featured, "sortOrder", "authorId", "authorName", "updatedById", "updatedByName", "publishedAt")
           values ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9::jsonb,$10::jsonb,$11,$12,$13,$14,$15,$16,$17,$18)
           on conflict (slug) do nothing`,
          [
            "leadership",
            m.name,
            slugify(m.name),
            m.description.slice(0, 180),
            m.description,
            m.role,
            m.image,
            "[]",
            "[]",
            JSON.stringify(m.meta),
            "published",
            false,
            order++,
            author.id,
            author.name,
            author.id,
            author.name,
            now,
          ],
        )
      }
      console.log(`seeded ${leadership.length} leadership members`)
    } else {
      console.log(`leadership already has ${existing.rows[0].n} rows; skipping seed`)
    }
    console.log("phase-2 migration complete")
  } finally {
    client.release()
    await pool.end()
  }
}

run().catch((e) => {
  console.error("migration failed:", e.message)
  process.exit(1)
})
