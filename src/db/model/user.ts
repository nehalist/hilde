import { User, users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function getUserById(id: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
  });
}

export async function updateUser(id: string, data: Partial<User>) {
  return db.update(users).set(data).where(eq(users.id, id)).returning();
}
