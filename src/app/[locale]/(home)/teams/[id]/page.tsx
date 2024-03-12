import { getTeamById } from "@/db/model/team";

export default async function TeamDetails({
  params,
}: {
  params: { id: string };
}) {
  const team = await getTeamById(params.id);

  return <pre>{JSON.stringify(team, null, 2)}</pre>;
}
