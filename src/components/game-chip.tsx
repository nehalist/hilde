"use client";

import { Game, games } from "@/lib/games";
import { Chip } from "@nextui-org/react";
import { GiChessPawn, GiShuttlecock, GiSoccerField, GiTable } from "react-icons/gi";
import { ReactNode } from "react";

export function GameChip({ game }: { game: Game["id"] }) {
  const gameData = games.find(g => g.id === game);
  if (!gameData) {
    return null;
  }

  let icon: ReactNode = null;
  switch (gameData.id) {
    case "foosball":
      icon = <GiSoccerField />;
      break;
    case "badminton":
      icon = <GiShuttlecock />
      break;
    case "chess":
      icon = <GiChessPawn />;
      break;
  }

  return <Chip startContent={icon} color="default" variant="faded">{gameData.name}</Chip>;
}
