import { Container } from "@/components/container";
import { getLeagueByInviteCode, userIsInLeague } from "@/db/model/league";
import { notFound } from "next/navigation";
import { InviteForm } from "@/app/[locale]/invite/form";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "@/lib/navigation";

export default async function Invite({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  if (!searchParams.code) {
    return notFound();
  }
  const user = await getCurrentUser();
  const [league] = await getLeagueByInviteCode(searchParams.code);
  if (await userIsInLeague(league.id, user!)) {
    return redirect("/");
  }

  return (
    <Container>
      <InviteForm league={league} code={searchParams.code} />
    </Container>
  );
}
