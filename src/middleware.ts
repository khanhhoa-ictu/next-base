import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "./lib/utils";
import { IPayloadJWT } from "./types";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token") || { value: "" };
  const payload: IPayloadJWT = decodeJWT(token?.value);

  if(payload?.role === "user" && pathname === "/manager") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname === "/manager" && !token?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token?.value && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/manager"],
};
