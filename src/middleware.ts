import { auth } from "../auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserRole } from "./types/roles";
import { Session } from "next-auth";
// Helper function to format log data
function formatLogData(req: NextRequest, session: Session) {
  return {
    timestamp: new Date().toISOString(),
    // method: request.method,
    // path: request.nextUrl.pathname,
    userEmail: session?.user?.email || "no-email",
    userId: session?.user?.id || "no-id",
    userRole: session?.user?.role || UserRole.USER,
  };
}

export default auth(async function middleware(request: NextRequest) {
  console.log("middleware");
  // Get auth session from the request
  const session = await auth();
  const role = session?.user?.role;
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return Response.redirect(loginUrl);
  }

  // Log the request details
  const logData = formatLogData(request, session);
  console.log("Auth Middleware Log:", {
    ...logData,
    headers: {
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    },
  });

  // Add custom headers
  const response = NextResponse.next();
  response.headers.set("x-user-id", String(session.user?.id || ""));
  response.headers.set(
    "x-user-role",
    String(session.user?.role || UserRole.USER)
  );

  // Check if user is trying to access admin dashboard
  if (role !== "admin" && request.nextUrl.pathname.startsWith("/admin")) {
    // const homeUrl = new URL("/", request.url);
    // homeUrl.searchParams.set("callbackUrl", request.url);
    return Response.redirect(new URL("/404", request.url));
  }

  return response;
});

export const config = {
  matcher: "/admin",
};
