import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /*
   * Routes that require authentication
   */
  const isProtectedRoute =
    pathname === "/" ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/post/create") ||
    pathname.startsWith("/post/edit");

  /*
   * Routes that should only be accessible
   * when the user is NOT logged in.
   */
  const isAuthRoute = pathname.startsWith("/auth");

  /*
   * Get the current Better Auth session.
   *
   * This checks the actual session and therefore
   * handles expired/invalid sessions as well.
   */
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session;

  /*
   * ------------------------------------------------
   * CASE 1:
   * User is NOT logged in
   * AND tries to access a protected route.
   * ------------------------------------------------
   */
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  /*
   * ------------------------------------------------
   * CASE 2:
   * User IS logged in
   * AND tries to access /auth.
   * ------------------------------------------------
   */
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /*
   * ------------------------------------------------
   * CASE 3:
   * Everything is allowed.
   * ------------------------------------------------
   */
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/profile/:path*",
    "/post/create/:path*",
    "/post/edit/:path*",
  ],
};
