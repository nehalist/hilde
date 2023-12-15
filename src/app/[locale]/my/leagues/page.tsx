import prisma from "@/lib/db";
import { LeagueTable } from "@/app/[locale]/my/leagues/league-table";
import { CreateLeague } from "@/app/[locale]/my/leagues/create-league";

async function getLeagues() {
  return prisma.league.findMany(); // TODO
}

export default async function Leagues() {
  const leagues = await getLeagues();

  return (
    <div className="flex flex-col gap-5">
      <div>... league description ...</div>
      <LeagueTable leagues={leagues} />
      <CreateLeague />
    </div>
  );
}
