"use client";

import { Button, Snippet } from "@nextui-org/react";
import { getLeagueWithUser } from "@/db/model/league";
import { UserTable } from "@/app/[locale]/my/leagues/[id]/user-table";
import { Card, CardBody } from "@nextui-org/card";

export function LeagueManagementContent({
  data,
}: {
  data: Awaited<ReturnType<typeof getLeagueWithUser>>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardBody>
          <div className="flex gap-2">
            <Snippet size="lg" symbol="">
              {data.league.inviteCode}
            </Snippet>
            <Button size="lg" color="danger">
              Regenerate
            </Button>
          </div>
        </CardBody>
      </Card>
      <UserTable data={data} />
    </div>
  );
}
