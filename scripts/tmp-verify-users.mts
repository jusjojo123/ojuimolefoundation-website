import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user as userTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

const users = [
  { name: "V0 Verify Admin", email: "v0-verify-admin@example.com", role: "admin", canPublish: true, canDelete: true },
  { name: "V0 Verify Editor", email: "v0-verify-editor@example.com", role: "editor", canPublish: false, canDelete: false },
]

for (const u of users) {
  try {
    await auth.api.signUpEmail({
      body: { name: u.name, email: u.email, password: "VerifyTemp12345!" },
    })
  } catch (e) {
    console.log("signUp note for", u.email, (e as Error).message)
  }
  await db
    .update(userTable)
    .set({ role: u.role, canPublish: u.canPublish, canDelete: u.canDelete, isActive: true })
    .where(eq(userTable.email, u.email))
  console.log("ready:", u.email, u.role)
}
process.exit(0)
