import { LandingPage } from "@/app/[locale]/(home)/landing-page";
import { Home } from "@/app/[locale]/(home)/home";
import { getCurrentUser } from "@/lib/session";

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    return <LandingPage />;
  }

  return <Home />;
}
