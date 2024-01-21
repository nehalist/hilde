import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { User } from "@/db/schema";

export async function getCurrentUser(): Promise<User | undefined> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) {
    return undefined;
  }
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, session.user.email!),
  });
}
