import prisma from "@/lib/db";
import { LeagueTable } from "@/app/[locale]/my/leagues/league-table";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { League } from "@prisma/client";
import { Link } from "@/lib/navigation";

async function getLeagues() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }

  const memberships = await prisma.teamMember.findMany({
    where: {
      userId: user.id,
    },
    include: {
      team: {
        include: {
          league: true,
        },
      },
    },
  });

  const leagues: League[] = [];
  memberships.forEach(membership => {
    const league = membership.team.league;
    if (leagues.find(l => l.id === league.id)) {
      return;
    }
    leagues.push(league);
  });

  return leagues;
}

export default async function Leagues() {
  const leagues = await getLeagues();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center">
        <div className="flex-1">... league description ...</div>
        <div className="text-right w-1/4">
          <Link href="/my/leagues/create">Create new League</Link>
        </div>
      </div>
      <LeagueTable leagues={leagues} />
    </div>
  );
}
