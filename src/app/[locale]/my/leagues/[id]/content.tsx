"use client";

import { getLeagueWithUser } from "@/db/model/league";
import { UserTable } from "@/app/[locale]/my/leagues/[id]/user-table";
import { InviteCode } from "@/app/[locale]/my/leagues/[id]/invite-code";
import { LeagueSettings } from "@/app/[locale]/my/leagues/[id]/settings";
import { LeagueStatus } from "@/app/[locale]/my/leagues/[id]/league-status";

export function LeagueManagementContent({
  data,
}: {
  data: Awaited<ReturnType<typeof getLeagueWithUser>>;
}) {
  return (
    <div className="flex flex-col gap-3">
      {data.league.status === "active" && <InviteCode league={data.league} />}
      <LeagueSettings league={data.league} />
      <LeagueStatus league={data.league} />
      <UserTable user={data.user} />
    </div>
  );
}
