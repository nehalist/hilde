import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Link } from "@/lib/navigation";
import { getLeaguesForUser } from "@/db/model/league";
import { LeagueTable } from "@/app/[locale]/my/leagues/league-table";

async function getLeagues() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }
  return getLeaguesForUser(user);
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
