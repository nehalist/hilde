import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "~/server/routers/_app";
import superjson from "superjson";
import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    if (typeof window !== "undefined") {
      return {
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
        ],
      }
    }
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : `${process.env.URL}/api/trpc`;

    return {
      transformer: superjson,
      links: [
        httpBatchLink({
          url,
        }),
      ],
    };
  },
  ssr: true,
  responseMeta({ clientErrors }) {
    if (clientErrors.length) {
      // propagate first http error from API calls
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      };
    }
    // cache full page for 1 day + revalidate once every second
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      "Cache-Control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
    };
  },
});
