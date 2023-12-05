import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
  });
}

export async function getUserLeagues() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const memberships = await prisma.teamMember.findMany({
    select: {
      team: {
        select: {
          league: true,
        },
      },
    },
    where: {
      userId: user.id,
    },
  });
  return memberships.map(m => m.team.league);
}

export async function getUserSelectedLeague() {
  const user = await getCurrentUser();
  if (!user || !user.selectedLeagueId) {
    return null;
  }
  return prisma.league.findFirst({
    include: {
      teams: true,
    },
    where: {
      id: user.selectedLeagueId,
    },
  });
}
