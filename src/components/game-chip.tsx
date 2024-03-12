"use client";

import { Game, games } from "@/lib/games";
import { Chip } from "@nextui-org/react";
import { GameIcon } from "@/components/game-icon";

export function GameChip({ game }: { game: Game["id"] }) {
  const gameData = games.find(g => g.id === game);
  if (!gameData) {
    return null;
  }

  return (
    <Chip
      startContent={<GameIcon game={game} />}
      color="default"
      variant="faded"
    >
      {gameData.name}
    </Chip>
  );
}
