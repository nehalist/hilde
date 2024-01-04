"use client";

import { Button, Input, Tab, Tabs } from "@nextui-org/react";
import { getLeagueWithUser } from "@/db/model/league";
import { UserTable } from "@/app/[locale]/my/leagues/[id]/user-table";
import { Card, CardBody } from "@nextui-org/card";

export function LeagueManagementContent({
  data,
}: {
  data: Awaited<ReturnType<typeof getLeagueWithUser>>;
}) {
  return (
    <Tabs>
      <Tab key="settings" title="Settings">
        Foo
      </Tab>
      <Tab key="members" title="Members">
        <UserTable data={data} />
        <Card>
          <CardBody>
            Add new member
            <div className="flex">
              <Input placeholder="Email" size="sm" />
              <Button type="submit" size="lg">Invite</Button>
            </div>
          </CardBody>
        </Card>
      </Tab>
    </Tabs>
  );
}
