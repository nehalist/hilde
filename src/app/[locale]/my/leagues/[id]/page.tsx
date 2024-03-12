import { LeagueManagementContent } from "@/app/[locale]/my/leagues/[id]/content";
import { MyHeader } from "@/app/[locale]/my/my-header";
import { getLeagueWithMemberships } from "@/db/model/league";
import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function LeagueDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const league = await getLeagueWithMemberships(id);
  const user = await getCurrentUser();

  if (!league || league.ownerId !== user?.id) {
    return notFound();
  }

  return (
    <>
      <MyHeader
        title={league.name}
        description={league.description || "No description"}
      />
      <LeagueManagementContent league={league} currentUser={user} />
    </>
  );
}
