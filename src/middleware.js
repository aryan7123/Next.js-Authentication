import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const userToken = request.cookies.get("user_token")?.value || "";
  const adminToken = request.cookies.get("admin_token")?.value || "";

  const isPublicPath = [
    "/login",
    "/signup",
    "/forgot-password",
    "/email-verification",
    "/admin/login",
  ].includes(path);

  // Define protected paths for regular users and admins
  const isUserProtectedPath = path === "/profile";
  const isAdminProtectedPath = path === "/admin/dashboard";

  // Redirect logic for non-authenticated access to protected paths
  if (isUserProtectedPath && !userToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminProtectedPath && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Redirect authenticated users trying to access public paths
  if (isPublicPath && userToken && !path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated admins trying to access the admin login page directly
  if (path === "/admin/login" && adminToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/forgot-password",
    "/email-verification",
    "/create-password",
    "/admin/login",
    "/admin/dashboard",
  ],
};
