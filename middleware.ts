import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Public self-registration is disabled: the only way to create accounts is
// through the admin dashboard (server-side `auth.api.signUpEmail`, which runs
// in-process and does NOT pass through this middleware). Any external HTTP
// POST to the Better Auth sign-up endpoint is rejected here.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith("/api/auth/sign-up")) {
    return NextResponse.json(
      { error: "Public sign-up is disabled." },
      { status: 403 },
    )
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/api/auth/sign-up/:path*"],
}
