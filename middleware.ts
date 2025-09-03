import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_auth")?.value;
  const { pathname } = req.nextUrl;

  //redirect to dashboard if already logged in
  if (pathname === "/admin") {
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } catch {
        const res = NextResponse.next();
        res.cookies.set("admin_auth", "", { path: "/", maxAge: 0 });
        return res;
      }
    }
    return NextResponse.next();
  }

  //verify token for /admin/dashboard
  if (pathname.startsWith("/admin/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/admin", req.url));
      res.cookies.set("admin_auth", "", { path: "/", maxAge: 0 });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/dashboard/:path*"],
  runtime: "nodejs",
};
