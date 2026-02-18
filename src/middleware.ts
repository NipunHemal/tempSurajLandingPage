import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const privateRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accesstoken")?.value;

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Allow access to complete-profile page even if profile is not complete
  if (pathname.startsWith('/complete-profile')) { 
    if (!accessToken) {
       return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === '/') {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
