import { CreateLeagueForm } from "@/app/[locale]/my/leagues/create/form";
import { getTranslations } from "next-intl/server";
import { MyHeader } from "@/app/[locale]/my/my-header";

export default async function CreateLeague() {
  const t = await getTranslations("my.leagues.create");

  return (
    <>
      <MyHeader title={t("title")} description={t("description")} />
      <CreateLeagueForm />
    </>
  );
}
