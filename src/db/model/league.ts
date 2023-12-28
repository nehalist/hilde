import {
  League,
  leagues,
  matches,
  teamMembers,
  teams,
  User,
} from "@/db/schema";
import { db } from "@/db";
import { desc, eq, or, sql } from "drizzle-orm";
import { RatingSystem } from "@/lib/rating";

export async function getLeaguesForUser(user: User) {
  return db
    .select({
      league: leagues,
      teams: sql<string>`count(distinct
      ${teams.id}
      )`,
      memberships: sql<string>`count(distinct
      ${teamMembers.id}
      )`,
      matches: sql<string>`count(distinct
      ${matches.id}
      )`,
      ownership: eq(leagues.ownerId, user.id),
    })
    .from(leagues)
    .leftJoin(teams, eq(leagues.id, teams.leagueId))
    .leftJoin(teamMembers, eq(teams.id, teamMembers.teamId))
    .leftJoin(matches, eq(leagues.id, matches.leagueId))
    .groupBy(leagues.id)
    .orderBy(desc(leagues.createdAt))
    .where(or(eq(teamMembers.userId, user.id), eq(leagues.ownerId, user.id)));
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

  const [team] = await db
    .insert(teams)
    .values({
      name: owner.name || "Unknown",
      leagueId: league.id,
    })
    .returning();

  await db
    .insert(teamMembers)
    .values({
      name: owner.name || "Unknown",
      teamId: team.id,
      userId: owner.id,
    })
    .returning();

  return league;
}

export async function updateLeague(league: League, data: Partial<League>) {
  return db.update(leagues).set(data).where(eq(leagues.id, league.id));
}
