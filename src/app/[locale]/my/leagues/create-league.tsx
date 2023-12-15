import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { CreateLeagueForm } from "@/app/[locale]/my/leagues/form";

export function CreateLeague() {
  return (
    <Card>
      <CardHeader>Create new League</CardHeader>
      <Divider />
      <CardBody>
        <CreateLeagueForm />
      </CardBody>
    </Card>
  );
}
