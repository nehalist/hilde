import { League, Team, teams } from "@/db/schema";
import { db } from "@/db";

export function getTeamSize(teamName: string) {
  return teamName.split(",").length;
}

export async function getOrCreateTeam(
  league: League,
  name: string,
  userId: string,
): Promise<Team> {
  const existingTeam = await db.query.teams.findFirst({
    where: (team, { eq }) => eq(team.name, name),
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
