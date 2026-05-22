import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/journal", "/learnings", "/planning", "/reminders", "/pomodoro"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/journal/:path*", "/learnings/:path*", "/planning/:path*", "/reminders/:path*", "/pomodoro/:path*"],
};
