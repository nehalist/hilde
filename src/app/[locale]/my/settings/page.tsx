import { SettingsForm } from "@/app/[locale]/my/settings/form";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { MyHeader } from "@/app/[locale]/my/my-header";
import { getTranslations } from "next-intl/server";

export default async function Settings() {
  const user = await getCurrentUser();
  const t = await getTranslations("my");
  if (!user) {
    return redirect(`/`);
  }

  return (
    <>
      <MyHeader
        title={t("settings.title")}
        description={t("settings.description")}
      />
      <Card>
        <CardHeader>{t("settings.profileCardHeader")}</CardHeader>
        <Divider />
        <CardBody>
          <div className="flex gap-5">
            <SettingsForm user={user} />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
