import {
  League,
  leagues,
  matches,
  membershipRole,
  memberships,
  Team,
  teams,
  User,
  users,
} from "@/db/schema";
import { db } from "@/db";
import { and, desc, eq, or, sql } from "drizzle-orm";
import { RatingSystem } from "@/lib/rating";
import { redirect } from "@/lib/navigation";
import { getCurrentUser } from "@/lib/session";

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
    .where(or(eq(teams.userId, user.id), eq(leagues.ownerId, user.id)));
}

export async function createLeague(
  owner: User,
  name: string,
  game: string,
  maxScorePerMatch: number,
  allowDraws: boolean,
  ratingSystem: RatingSystem,
  defaultRating: number,
  ratingSystemParameters: Record<string, number>,
  description?: string,
  image?: string,
) {
  const [league] = await db
    .insert(leagues)
    .values({
      name,
      description,
      game,
      maxScorePerMatch,
      allowDraws,
      ratingSystem,
      defaultRating,
      ratingSystemParameters,
      image,
      ownerId: owner.id,
    })
    .returning();

  await createMembership(league, owner, "admin");

  return league;
}

export async function createMembership(
  league: League,
  user: User,
  role?: typeof membershipRole.enumValues[number],
) {
  const [membership] = await db
    .insert(memberships)
    .values({
      leagueId: league.id,
      userId: user.id,
      role: role || "member",
    })
    .returning();

  await db
    .insert(teams)
    .values({
      leagueId: league.id,
      userId: user.id,
      name: user.name || "Unknown",
    });

  return membership;
}

export async function updateLeague(league: League, data: Partial<League>) {
  return db.update(leagues).set(data).where(eq(leagues.id, league.id));
}

export async function getLeagueWithUser(leagueId: string) {
  const data = await db
    .select()
    .from(leagues)
    .leftJoin(teams, eq(teams.leagueId, leagues.id))
    .leftJoin(users, eq(users.id, teams.userId))
    .where(eq(leagues.id, leagueId));

  if (!data) {
    redirect("/404");
  }

  const user: (User & { teams: Team[] })[] = [];
  data.forEach(row => {
    if (!row.user) {
      return;
    }
    if (user.find(u => u.id === row.user?.id)) {
      if (
        row.team &&
        !user.find(u => u.teams.find(t => t.id === row.team?.id))
      ) {
        user.find(u => u.id === row.user?.id)?.teams.push(row.team);
      }
      return;
    }
    user.push({
      ...row.user,
      teams: row.team ? [row.team] : [],
    });
  });

  return {
    league: data[0]?.league,
    user,
  };
}

export async function getLeagueByInviteCode(code: string) {
  return db
    .select()
    .from(leagues)
    .where(and(eq(leagues.inviteCode, code), eq(leagues.status, "active")))
    .limit(1);
}

export async function getLeagueById(id: string) {
  return db.select().from(leagues).where(eq(leagues.id, id));
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
      eq(teams.userId, user.id)
    ),
  });
}
