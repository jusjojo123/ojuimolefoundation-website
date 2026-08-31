import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user as userTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

async function make(email: string, name: string, role: string, extra: Record<string, unknown> = {}) {
  try {
    await auth.api.signUpEmail({
      body: { email, password: "VerifyTemp12345!", name },
    })
  } catch (e) {
    console.log("signUp note:", (e as Error).message)
  }
  await db
    .update(userTable)
    .set({ role, isActive: true, ...extra })
    .where(eq(userTable.email, email))
  console.log("ready:", email, "role:", role, JSON.stringify(extra))
}

await make("v0-verify-admin@example.com", "V0 Verify Admin", "admin")
// Editor with publish + delete enabled to exercise the full editor path
await make("v0-verify-editor@example.com", "V0 Verify Editor", "editor", {
  canPublish: true,
  canDelete: false,
})
process.exit(0)
