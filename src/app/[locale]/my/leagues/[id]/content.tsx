"use client";

import { MembershipsTable } from "@/app/[locale]/my/leagues/[id]/memberships-table";
import { InviteCode } from "@/app/[locale]/my/leagues/[id]/invite-code";
import { LeagueSettings } from "@/app/[locale]/my/leagues/[id]/settings";
import { LeagueStatus } from "@/app/[locale]/my/leagues/[id]/league-status";
import { User } from "@/db/schema";
import { getLeagueWithMemberships } from "@/db/model/league";

export function LeagueManagementContent({
  league,
  currentUser,
}: {
  league: Awaited<ReturnType<typeof getLeagueWithMemberships>>;
  currentUser: User;
}) {
  if (! league) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {league.status === "active" && <InviteCode league={league} />}
      <LeagueSettings league={league} />
      <LeagueStatus league={league} />
      <MembershipsTable
        memberships={league.memberships}
        currentUser={currentUser}
        league={league}
      />
    </div>
  );
}
