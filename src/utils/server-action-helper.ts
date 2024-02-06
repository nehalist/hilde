import { z } from "zod";
import { getCurrentUser } from "@/lib/session";
import { User } from "@/db/schema";

type StateError = {
  status: "error";
  message?: string;
};

type StateSuccess<T> = {
  status: "success";
  message?: string;
  data?: T;
};

export type ServerActionState<TData = any> = StateError | StateSuccess<TData>;

export function createServerAction<
  TData extends z.ZodRawShape,
  TStateData extends ServerActionState,
>(
  schema: z.ZodEffects<
    z.ZodObject<TData>,
    z.output<z.ZodObject<TData>>,
    unknown
  >,
  action: (
    input: z.infer<typeof schema>,
    prevState: ServerActionState | null,
  ) => Promise<TStateData>,
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
          data: e.issues,
        };
      }
      return {
        status: "error" as const,
        message: "An error occurred",
      };
    }
  };
}

export function createAuthenticatedServerAction<
  TData extends z.ZodRawShape,
  TStateData extends ServerActionState,
>(
  schema: z.ZodEffects<
    z.ZodObject<TData>,
    z.output<z.ZodObject<TData>>,
    unknown
  >,
  action: (
    input: z.infer<typeof schema>,
    context: { user: User },
    prevState: ServerActionState | null,
  ) => Promise<TStateData>,
) {
  return createServerAction(schema, async (input, prevState) => {
    const user = await getCurrentUser();
    if (!user) {
      return {
        status: "error" as const,
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
