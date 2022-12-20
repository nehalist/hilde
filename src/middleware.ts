import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  const httpAuthUser = process.env.HTTP_AUTH_USER;
  const httpAuthPass = process.env.HTTP_AUTH_PASS;

  if (!httpAuthUser || !httpAuthPass) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === httpAuthUser && pwd === httpAuthPass) {
      return NextResponse.next();
    }
  }
  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
}
