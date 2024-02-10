import { db } from "@/db";
import {
  League,
  leagues,
  matches,
  membershipRole,
  memberships,
  teams,
  User,
} from "@/db/schema";
import { RatingSystem } from "@/lib/rating";
import { getCurrentUser } from "@/lib/session";
import { and, desc, eq, or, sql } from "drizzle-orm";

export async function getUserLeagues(user: User) {
  return db
    .select({
      league: leagues,
      teams: sql<string>`count(distinct
      ${teams.id}
      )`,
      memberships: sql<string>`count(distinct
      ${memberships.userId}
      )`,
      matches: sql<string>`count(distinct
      ${matches.id}
      )`,
      ownership: eq(leagues.ownerId, user.id),
    })
    .from(leagues)
    .leftJoin(teams, eq(leagues.id, teams.leagueId))
    .leftJoin(memberships, eq(leagues.id, memberships.leagueId))
    .leftJoin(matches, eq(leagues.id, matches.leagueId))
    .groupBy(leagues.id)
    .orderBy(desc(leagues.createdAt))
    .where(or(eq(memberships.userId, user.id), eq(leagues.ownerId, user.id)));
}

export async function createLeague(
  owner: User,
  name: string,
  game: string,
  ratingSystem: RatingSystem,
  defaultRating: number,
  ratingSystemParameters: Record<string, number>,
  description?: string,
) {
  const [league] = await db
    .insert(leagues)
    .values({
      name,
      description,
      game,
      ratingSystem,
      defaultRating,
      ratingSystemParameters,
      ownerId: owner.id,
    })
    .returning();

  await createMembership(league, owner, "admin");

  return league;
}

export async function createMembership(
  league: League,
  user: User,
  role?: (typeof membershipRole.enumValues)[number],
) {
  const [membership] = await db
    .insert(memberships)
    .values({
      leagueId: league.id,
      userId: user.id,
      role: role || "member",
    })
    .returning();

  await db.insert(teams).values({
    leagueId: league.id,
    userId: user.id,
    name: user.name || "Unknown",
  });

  return membership;
}

export async function updateLeague(league: League, data: Partial<League>) {
  return db.update(leagues).set(data).where(eq(leagues.id, league.id));
}

export async function getLeagueWithMemberships(leagueId: string) {
  return db.query.leagues.findFirst({
    with: {
      memberships: {
        with: {
          user: true,
        },
      },
    },
    where: eq(leagues.id, leagueId),
  });
}

export async function getLeagueByInviteCode(code: string) {
  return db
    .select()
    .from(leagues)
    .where(and(eq(leagues.inviteCode, code), eq(leagues.status, "active")))
    .limit(1);
}

export async function getLeagueById(id: string) {
  return db.query.leagues.findFirst({ where: eq(leagues.id, id) });
}

export async function regenerateInviteCodeForLeague(league: League) {
  return db
    .update(leagues)
    .set({
      inviteCode: sql`substr
      (md5(random()::text), 0, 25)`,
    })
    .where(eq(leagues.id, league.id))
    .returning();
}

export async function userIsInLeague(leagueId: string, user: User) {
  const membership = await db.query.memberships.findFirst({
    where: and(
      eq(memberships.leagueId, leagueId),
      eq(memberships.userId, user.id),
    ),
  });

  return !!membership;
}

export async function removeUserFromLeague(leagueId: string, user: User) {
  return db
    .delete(memberships)
    .where(
      and(eq(memberships.leagueId, leagueId), eq(memberships.userId, user.id)),
    );
}

export async function getLeaguesForCurrentUser() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  return (
    await db
      .select({ league: leagues })
      .from(leagues)
      .leftJoin(memberships, eq(memberships.leagueId, leagues.id))
      .where(or(eq(memberships.userId, user.id), eq(leagues.ownerId, user.id)))
      .groupBy(leagues.id)
  ).map(l => l.league);
}

export async function getLeagueTeamsForCurrentUser() {
  const user = await getCurrentUser();
  if (!user || !user.selectedLeagueId) {
    return [];
  }

  return db.query.teams.findMany({
    where: and(
      eq(teams.leagueId, user.selectedLeagueId),
      eq(teams.userId, user.id),
    ),
  });
}

export async function getLeagueTeams(leagueId: string) {
  return db.query.teams.findMany({
    where: and(eq(teams.leagueId, leagueId)),
  });
}

export async function getSelectedUserLeague() {
  const user = await getCurrentUser();
  if (!user || !user.selectedLeagueId) {
    return null;
  }
  const selectedLeagueId = user.selectedLeagueId;
  if (!selectedLeagueId) {
    return null;
  }
  return db.query.leagues.findFirst({
    where: (leagues, { eq }) => eq(leagues.id, selectedLeagueId),
  });
}
