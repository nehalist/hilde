import { SettingsForm } from "@/app/my/settings/form";
import { redirect } from "next/navigation";
// import { getUser } from "@/utils/supabase/helper";

export default async function Settings() {
  // const user = await getUser();
  // if (!user) {
  //   return redirect(`/`);
  // }

  return <SettingsForm />;
}
