import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const PUBLIC_PATHS = ["/", "/signup", "/api/auth/login", "/api/auth/register", "/favicon.ico", "/_next"];

async function verifyToken(token: string) {
  try {
    const key = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value || null;
  const isPublic = PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p));
  const isAuthPage = pathname === "/" || pathname === "/signup";

  const isProtected = !isPublic;

  if (isProtected && !token) {
    const url = new URL("/", req.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isProtected && token) {
    const valid = await verifyToken(token);
    if (!valid) {
      const res = NextResponse.redirect(new URL("/", req.url));
      res.cookies.set("token", "", { path: "/", maxAge: 0 });
      return res;
    }
  }

  if (isAuthPage && token) {
    const valid = await verifyToken(token);
    if (valid) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/user/:path*",
    "/api/logout",
    "/",        // needed to redirect logged-in users away from login page
    "/signup"   // same
  ]
};
