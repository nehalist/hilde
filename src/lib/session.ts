import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { League, User } from "@/db/schema";

export async function getCurrentUser(): Promise<User | undefined> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.email) {
    return undefined;
  }
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, session.user.email!),
  });
}

export async function getUserLeagues() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const leagues: League[] = [];
  (
    await db.query.teamMembers.findMany({
      with: {
        team: {
          with: {
            league: true,
          },
        },
      },
      where: (teamMembers, { eq }) => eq(teamMembers.userId, user.id),
    })
  ).forEach(membership => {
    if (leagues.find(l => l.id === membership.team.league.id)) {
      return;
    }
    leagues.push(membership.team.league);
  });

  return leagues;
}

export async function getUserSelectedLeague() {
  const user = await getCurrentUser();
  if (!user || !user.selectedLeagueId) {
    return null;
  }
  return user.selectedLeagueId;
}
