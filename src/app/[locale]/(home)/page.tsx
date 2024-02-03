import { LandingPage } from "@/app/[locale]/(home)/landing-page";
import { Home } from "@/app/[locale]/(home)/home";
import { getCurrentUser } from "@/lib/session";
import { getProviders } from "next-auth/react";

export default async function Page() {
  const user = await getCurrentUser();
  const providers = await getProviders();

  if (!user) {
    return <LandingPage providers={providers} />;
  }

  return <Home />;
}
