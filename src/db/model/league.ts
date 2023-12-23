import { leagues, matches, teamMembers, teams, User } from "@/db/schema";
import { db } from "@/db";
import { eq, or, sql } from "drizzle-orm";

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
    .where(or(eq(teamMembers.userId, user.id), eq(leagues.ownerId, user.id)));
}
