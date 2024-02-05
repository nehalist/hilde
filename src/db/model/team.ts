import { League, Team, teams } from "@/db/schema";
import { db } from "@/db";
import { and } from "drizzle-orm";

export function getTeamSize(teamName: string) {
  return teamName.split(",").length;
}

export async function getOrCreateTeam(
  league: League,
  name: string,
  userId: string,
): Promise<Team> {
  const existingTeam = await db.query.teams.findFirst({
    where: (team, { eq }) =>
      and(eq(team.name, name), eq(team.leagueId, league.id)),
  });
  if (existingTeam) {
    return existingTeam;
  }

  const [team] = await db
    .insert(teams)
    .values({
      name,
      leagueId: league.id,
      userId,
      teamSize: getTeamSize(name),
    })
    .onConflictDoNothing()
    .returning();

  return team;
}
