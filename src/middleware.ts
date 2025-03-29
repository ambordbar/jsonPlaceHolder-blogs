import { auth } from "./lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth(async function middleware(request: NextRequest) {
  const session = await auth();
  const role = session?.user?.role;
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return Response.redirect(loginUrl);
  }

  if (role !== "admin" && request.nextUrl.pathname.startsWith("/admin")) {
    return Response.redirect(new URL("/404", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
