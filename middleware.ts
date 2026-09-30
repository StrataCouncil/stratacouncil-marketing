import { NextResponse, type NextRequest } from "next/server";

/**
 * Temporary site-wide gate (2026-09-30, doc00 changelog) — the real
 * marketing site (homepage, /privacy, /terms) is live and functional, but
 * has placeholder art and some non-working links, so it isn't ready to
 * show a cold visitor yet. Every request is redirected to /coming-soon
 * except the coming-soon page itself and Next's own static assets.
 *
 * To take this down once the real site is ready: delete this file. No
 * other change is needed — every real page keeps working exactly as it
 * does today, this redirect is purely additive and fully reversible.
 */
const ALWAYS_ALLOWED = ["/coming-soon"];

function isAlwaysAllowed(pathname: string) {
  return ALWAYS_ALLOWED.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAlwaysAllowed(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
