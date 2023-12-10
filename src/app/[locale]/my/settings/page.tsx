import { SettingsForm } from "@/app/[locale]/my/settings/form";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { Avatar } from "@/app/[locale]/my/settings/avatar";

export default async function Settings() {
  const user = await getCurrentUser();
  if (!user) {
    return redirect(`/`);
  }

  return (
    <>
      <Card>
        <CardHeader>Profile</CardHeader>
        <Divider />
        <CardBody>
          <div className="flex gap-5">
            <SettingsForm user={user} />
            <Avatar />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
