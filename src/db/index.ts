import "dotenv/config";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

export const client = postgres(`${process.env.DATABASE_URL}`);

if (process.env.NODE_ENV === "production") {
  db = drizzle(client, { schema });
} else {
  if (!global.db) {
    global.db = drizzle(client, { schema });
  }

  db = global.db;
}

export { db };
