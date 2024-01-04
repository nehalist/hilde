import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCurrentUser } from "@/lib/session";
import { MyHeader } from "@/app/[locale]/my/my-header";

export default async function Feedback() {
  const user = await getCurrentUser();
  const t = await getTranslations("my");
  if (!user) {
    return redirect(`/`);
  }

  return (
    <>
      <MyHeader title={`Feedback`} description={"feedback description"} />
    </>
  );
}
