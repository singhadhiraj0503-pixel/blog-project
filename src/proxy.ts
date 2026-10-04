import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname === "/" ||
    pathname.startsWith("/post") ||
    pathname.startsWith("/profile");

  const isAuthRoute = pathname.startsWith("/auth");

  // No session → protected route → /auth
  if (isProtectedRoute && !sessionCookie) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Session exists → /auth → homepage
  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/", "/post/create", "/post/edit/:path*"],
};
