import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user as userTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

const email = "v0-verify-admin@example.com"
const password = "VerifyTemp12345!"

async function main() {
  const existing = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1)
  if (existing.length === 0) {
    await auth.api.signUpEmail({ body: { email, password, name: "V0 Verify Admin" } })
  }
  await db.update(userTable).set({ role: "admin" }).where(eq(userTable.email, email))
  console.log("[v0] temp admin ready:", email)
  process.exit(0)
}

main().catch((e) => {
  console.error("[v0] setup error:", e)
  process.exit(1)
})
