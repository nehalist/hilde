import createMiddleware from "next-intl/middleware";
import { locales } from "@/i18n";
import { withAuth } from "next-auth/middleware";
import { NextRequestWithAuth } from "next-auth/src/next/middleware";
import { NextRequest } from "next/server";

const publicPages = ["/", "/blog", "/blog/(.*)", "/about"];

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});

const authMiddleware = withAuth(
  function onSuccess(req: NextRequestWithAuth) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token !== null;
      },
    },
    // pages: {
    //   signIn: '/login'
    // }
  },
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap(p => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
