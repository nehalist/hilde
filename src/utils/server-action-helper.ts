import { z } from "zod";
import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";

export interface ServerActionState {
  status: "success" | "error";
  message?: string;
  context?: unknown;
}

export function createServerAction<TData extends z.ZodRawShape>(
  schema: z.ZodEffects<
    z.ZodObject<TData>,
    z.output<z.ZodObject<TData>>,
    unknown
  >,
  action: (
    input: z.infer<typeof schema>,
    prevState: ServerActionState | null,
  ) => Promise<ServerActionState>,
) {
  return async function (prevState: ServerActionState | null, data: FormData) {
    try {
      const input = schema.parse(data);
      return action(input, prevState);
    } catch (e) {
      console.error(e);
      if (e instanceof z.ZodError) {
        return {
          status: "error" as const,
          message: e.message,
          context: e.issues,
        };
      }
      return {
        status: "error" as const,
        message: "An error occurred",
      };
    }
  };
}

export function createAuthenticatedServerAction<TData extends z.ZodRawShape>(
  schema: z.ZodEffects<
    z.ZodObject<TData>,
    z.output<z.ZodObject<TData>>,
    unknown
  >,
  action: (
    input: z.infer<typeof schema>,
    context: { user: User },
    prevState: ServerActionState | null,
  ) => Promise<ServerActionState>,
) {
  return createServerAction(schema, async (input, prevState) => {
    const user = await getCurrentUser();
    if (!user) {
      return {
        status: "error",
        message: "User not found",
      };
    }
    return action(
      input,
      {
        user,
      },
      prevState,
    );
  });
}
