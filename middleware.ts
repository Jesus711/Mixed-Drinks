// middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Define the middleware function with TypeScript typing
export function middleware(request: NextRequest) {
  // Log the requested pathname for debugging
  console.log("Requested pathname:", request.nextUrl.pathname);

  // // Check if the pathname starts with "/api"
  // if (request.nextUrl.pathname.startsWith("/api")) {
  //   console.log("Redirecting from API route to homepage");
  //   // Redirect to the homepage
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // Proceed with the request if not an API route
  return NextResponse.next();
}

// Configuration to match API routes
export const config = {
  matcher: "/api/:path*", // Matches /api and all subpaths
};