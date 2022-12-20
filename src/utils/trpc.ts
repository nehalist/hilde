import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "~/server/routers/_app";
import superjson from "superjson";
import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    const url =
      typeof window !== "undefined"
        ? `/api/trpc`
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
  ssr: false,
});
