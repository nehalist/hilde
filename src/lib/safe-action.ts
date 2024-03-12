import { getCurrentUser } from "@/lib/session";
import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    return { user };
  },
});
