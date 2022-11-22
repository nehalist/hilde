import { FunctionComponent } from "react";
import { Team } from "@prisma/client";
import Link from "next/link";

export const TeamLink: FunctionComponent<{ team: Team | string }> = ({
  team,
}) => {
  if (typeof team === "object") {
    team = team.name;
  }
  return <Link href={`/teams/${team}`} className="hover:underline">{team}</Link>;
};
