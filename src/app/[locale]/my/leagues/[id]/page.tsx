import { getLeagueWithUser } from "@/db/model/league";
import { MyHeader } from "@/app/[locale]/my/my-header";
import { LeagueManagementContent } from "@/app/[locale]/my/leagues/[id]/content";

export default async function LeagueDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const league = await getLeagueWithUser(id);

  return (
    <>
      <MyHeader
        title={league.league.name}
        description={league.league.description || "No description"}
      />
      <LeagueManagementContent data={league} />
      {/*<div>settings: image, name, description</div>*/}
      {/*<div>game settings</div>*/}
      {/*<div>rating settings</div>*/}
      {/*<UserTable data={league} />*/}
      {/*<div>administrative controls: delete league</div>*/}
    </>
  );
}
