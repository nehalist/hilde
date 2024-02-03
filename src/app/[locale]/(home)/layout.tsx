import React, { ReactNode } from "react";
import "@/styles/globals.css";
import { getLeaguesForCurrentUser } from "@/db/model/league";
import { getCurrentUser } from "@/lib/session";
import { LeagueHeader } from "@/app/[locale]/(home)/league-header";
import { Container } from "@/components/container";

export const metadata = {
  title: "Hilde - Platform",
  description: "Hilde.",
};

export default async function HomeLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const leagues = await getLeaguesForCurrentUser();
  const user = await getCurrentUser();

  if (!user || !leagues) {
    return <>{children}</>;
  }

  return (
    <Container>
      <div className="col-span-3 flex flex-col gap-5 mt-5">
        <LeagueHeader
          leagues={leagues}
          selectedLeagueId={user.selectedLeagueId}
        />
        {children}
      </div>
    </Container>
  );
}
