import { NextResponse, type NextRequest } from "next/server";

/**
 * Site-wide gate: while the site is held back, every production request
 * goes to /coming-soon, except that page and static assets. Vercel preview
 * deployments and local development aren't gated, so the full site can
 * still be reviewed there.
 *
 * To open the site: delete this file. Every page keeps working as it is.
 */
const ALWAYS_ALLOWED = ["/coming-soon"];

function isAlwaysAllowed(pathname: string) {
  return ALWAYS_ALLOWED.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function middleware(request: NextRequest) {
  if (process.env.VERCEL_ENV !== "production") return NextResponse.next();
  const { pathname } = request.nextUrl;
  if (isAlwaysAllowed(pathname)) return NextResponse.next();
  return NextResponse.redirect(new URL("/coming-soon", request.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|apple-icon.png|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
