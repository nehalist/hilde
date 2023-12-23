import "server-only";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { User } from "@/db/schema";

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
  // const user = await getCurrentUser();
  // if (!user) {
  //   return null;
  // }
  // const memberships = await prisma.teamMember.findMany({
  //   select: {
  //     team: {
  //       select: {
  //         league: true,
  //       },
  //     },
  //   },
  //   where: {
  //     userId: user.id,
  //   },
  // });
  // return memberships.map(m => m.team.league);
  return [];
}

export async function getUserSelectedLeague() {
  return null;
  // const user = await getCurrentUser();
  // if (!user || !user.selectedLeagueId) {
  //   return null;
  // }
  // return prisma.league.findFirst({
  //   include: {
  //     teams: true,
  //   },
  //   where: {
  //     id: user.selectedLeagueId,
  //   },
  // });
}
