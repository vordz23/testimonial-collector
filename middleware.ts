import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    const session = await getSession();
    
    if (!session.isAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
