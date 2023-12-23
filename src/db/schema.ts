import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const leagueStatusEnum = pgEnum("leagueStatus", ["active", "finished"]);

export const leagues = pgTable("league", {
  id: text("id")
    .$defaultFn(() => crypto.randomUUID())
    .primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  description: text("description"),
  status: leagueStatusEnum("leagueStatus").default("active"),
  ownerId: text("ownerId")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export type League = typeof leagues.$inferSelect;

export const leaguesRelations = relations(leagues, ({ one, many }) => ({
  owner: one(users, {
    fields: [leagues.ownerId],
    references: [users.id],
  }),
  teams: many(teams),
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
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const teamsRelations = relations(teams, ({ one, many }) => ({
  league: one(leagues, {
    fields: [teams.leagueId],
    references: [leagues.id],
  }),
  members: many(teamMembers),
}));

export const teamMembers = pgTable(
  "team_member",
  {
    id: text("id")
      .$defaultFn(() => crypto.randomUUID())
      .primaryKey(),
    name: text("name").notNull(),
    image: text("image"),
    teamId: text("teamId")
      .notNull()
      .references(() => teams.id, { onDelete: "cascade" }),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  },
  t => ({
    unq: unique().on(t.teamId, t.userId),
  }),
);

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [teamMembers.userId],
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

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  selectedLeagueId: text("selectedLeagueId"),
});

export type User = typeof users.$inferSelect;

export const usersRelations = relations(users, ({ one, many }) => ({
  selectedLeague: one(leagues, {
    fields: [users.selectedLeagueId],
    references: [leagues.id],
  }),
  leagues: many(leagues),
  teams: many(teams),
  memberships: many(teamMembers),
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