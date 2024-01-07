"use client";

import { getLeagueWithUser } from "@/db/model/league";
import { UserTable } from "@/app/[locale]/my/leagues/[id]/user-table";
import { InviteCode } from "@/app/[locale]/my/leagues/[id]/invite-code";

export function LeagueManagementContent({
  data,
}: {
  data: Awaited<ReturnType<typeof getLeagueWithUser>>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <InviteCode league={data.league} />
      <UserTable user={data.user} />
    </div>
  );
}
