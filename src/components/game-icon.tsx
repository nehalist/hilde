"use client";

import { Game, games } from "@/lib/games";
import { ReactNode } from "react";
import { GiChessPawn, GiShuttlecock, GiSoccerField } from "react-icons/gi";
import { FaTrophy } from "react-icons/fa";

export function GameIcon({ game: game }: { game: Game["id"] }) {
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
    default:
      icon = <FaTrophy />;
      break;
  }


  return icon;
}
