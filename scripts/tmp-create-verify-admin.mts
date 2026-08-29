import { auth } from "../lib/auth"
import { db, pool } from "../lib/db"
import { user } from "../lib/db/schema"
import { eq } from "drizzle-orm"

const email = "v0-verify-temp@example.com"
const password = "VerifyTemp12345!"

async function main() {
  try {
    await auth.api.signUpEmail({
      body: { email, password, name: "V0 Verify" },
    })
  } catch (err) {
    console.log("signUp note:", (err as Error).message)
  }
  await db.update(user).set({ role: "admin" }).where(eq(user.email, email))
  console.log("temp admin ready:", email)
  await pool.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
