import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define routes that don't require authentication
  const bypassRoutes = [
    "/auth/login",
    "/auth/register",
    "/not-authorized",
    "/error",
    "/about",
    "/",
  ];

  // Check if current path is a bypass route or a static file
  const isPublicRoute =
    bypassRoutes.includes(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes("."); // static assets

  if (isPublicRoute) return NextResponse.next();

  // 2. Get and parse authentication data from cookies
  const cookiesData = request.cookies.get("auth")?.value;
  const userRole = request.cookies.get("role")?.value;
  let userInfo: any = {};

  try {
    userInfo = JSON.parse(cookiesData || "{}");
  } catch (e) {
    userInfo = {};
  }

  const accessToken = userInfo?.access || userInfo?.accessToken || null;
  const role = userRole;

  // 3. Gate 1: Check Authentication
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 4. Gate 2: Check Authorization (Role-based access)
  // Admin routes vs User routes
  const isAdminPath =
    pathname.startsWith("/admin") || pathname.startsWith("/add-test");
  const isUserPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/my-booking") ||
    pathname.startsWith("/get-post");

  // Admin access check
  if (isAdminPath && role !== "admin") {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  // User access check
  if (isUserPath && role !== "user" && role !== "admin") {
    // Note: Allowing admins to also see user paths
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  return NextResponse.next();
}

// Ensure the middleware runs on all relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
