import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const { req, res } = opts;
  return {
    req,
    res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
