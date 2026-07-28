import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user as userTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

// TEMPORARY verification-only route. Deleted after end-to-end checks.
const TEST_EMAIL = "v0-verify@example.com"

export async function POST() {
  try {
    await auth.api.signUpEmail({
      body: { name: "V0 Verify", email: TEST_EMAIL, password: "verify-password-123" },
    })
    await db
      .update(userTable)
      .set({ role: "admin", emailVerified: true })
      .where(eq(userTable.email, TEST_EMAIL))
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}

export async function DELETE() {
  await db.delete(userTable).where(eq(userTable.email, TEST_EMAIL))
  return NextResponse.json({ ok: true })
}
