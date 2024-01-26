import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("user_token")?.value || "";
  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgot-password" ||
    path === "/email-verification";
    
  const isProtectedPath = path === "/profile";

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
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
  ],
};
