import { UserTable } from "@/app/[locale]/my/leagues/[id]/user-table";
import { getLeagueWithUser } from "@/db/model/league";

export default async function LeagueDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const league = await getLeagueWithUser(id);

  return (
    <>
      <UserTable data={league} />
    </>
  );
}
