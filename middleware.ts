import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Helper function to format log data
function formatLogData(req: NextRequest, session: any) {
  return {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.nextUrl.pathname,
    userEmail: session?.user?.email || "no-email",
    userId: session?.user?.id || "no-id",
  };
}

export default async function middleware(req: NextRequest) {
  const session = await auth();

  // If no session, redirect to login
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Log the request details
  const logData = formatLogData(req, session);
  console.log("Auth Middleware Log:", {
    ...logData,
    headers: {
      userAgent: req.headers.get("user-agent"),
      referer: req.headers.get("referer"),
    },
  });

  // Add custom headers
  const response = NextResponse.next();
  response.headers.set("x-user-id", String(session.user?.id || ""));
  response.headers.set("x-user-role", String(session.user?.role || "user"));
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/api/protected/:path*"],
};
