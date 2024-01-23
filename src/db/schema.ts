import {
  boolean,
  integer,
  json,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";
import { games } from "@/lib/games";
import { ratingSystems } from "@/lib/rating";

export const leagueStatusEnum = pgEnum("leagueStatus", ["active", "finished"]);
export const gamesEnum = pgEnum("game", [
  "custom",
  ...games.filter(g => g.id !== "custom").map(g => g.id),
]);
export const ratingSystemsEnum = pgEnum("ratingSystem", [
  "unknown",
  ...ratingSystems.map(rs => rs.id),
]);
export const userRolesEnum = pgEnum("role", ["user", "admin"]);
export const membershipRole = pgEnum("membershipRole", ["member", "admin"]);

export const leagues = pgTable("league", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  description: text("description"),
  game: gamesEnum("game").notNull().default("custom"),
  maxScorePerMatch: integer("maxScorePerMatch").notNull().default(0),
  allowDraws: boolean("allowDraws").notNull().default(true),
  defaultRating: integer("defaultRating").notNull().default(1000),
  ratingSystem: ratingSystemsEnum("ratingSystem").notNull().default("unknown"),
  ratingSystemParameters: json("ratingSystemParameters").notNull().default({}),
  status: leagueStatusEnum("leagueStatus").default("active"),
  inviteCode: text("inviteCode").notNull().unique().default(sql`substr(md5(random()::text), 0, 25)`),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const memberships = pgTable(
  "memberships",
  {
    leagueId: text("leagueId")
      .notNull()
      .references(() => leagues.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: membershipRole("role").notNull().default("member"),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  t => ({
    pk: primaryKey({ columns: [t.userId, t.leagueId]}),
  }),
);

export type League = typeof leagues.$inferSelect;
export type NewLeague = typeof leagues.$inferInsert;

export const leaguesRelations = relations(leagues, ({ one, many }) => ({
  owner: one(users, {
    fields: [leagues.ownerId],
    references: [users.id],
  }),
  teams: many(teams),
  users: many(memberships),
}));

export const teams = pgTable("team", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  leagueId: text("leagueId")
    .notNull()
    .references(() => leagues.id, { onDelete: "cascade" }),
  teamSize: integer("teamsize").notNull().default(1),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export type Team = typeof teams.$inferSelect;

export const teamsRelations = relations(teams, ({ one, many }) => ({
  league: one(leagues, {
    fields: [teams.leagueId],
    references: [leagues.id],
  }),
  user: one(users, {
    fields: [teams.userId],
    references: [users.id],
  }),
}));

export const matches = pgTable("matches", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  leagueId: text("leagueId")
    .notNull()
    .references(() => leagues.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const feedback = pgTable("feedback", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  description: text("description"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  role: userRolesEnum("role").notNull().default("user"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  selectedLeagueId: text("selectedLeagueId"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ one, many }) => ({
  selectedLeague: one(leagues, {
    fields: [users.selectedLeagueId],
    references: [leagues.id],
  }),
  leagues: many(memberships),
  teams: many(teams),
  feedback: many(feedback),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId").references(() => users.id, {
      onDelete: "cascade",
    }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  account => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  vt => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
