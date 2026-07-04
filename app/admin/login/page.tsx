import { redirect } from "next/navigation"
import { getSession, hasAnyUser } from "@/lib/auth-helpers"
import { LoginForm } from "@/components/admin/login-form"

export const metadata = {
  title: "Admin Sign In | Ojú Imọlẹ Media Foundation",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const session = await getSession()
  if (session?.user) redirect("/admin")

  const needsSetup = !(await hasAnyUser())
  return <LoginForm needsSetup={needsSetup} />
}
