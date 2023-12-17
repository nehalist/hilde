export interface Game {
  id: string;
  name: string;
  defaults: {
    maxScore: number;
    allowDraws: boolean;
    ratingSystem: string;
  };
}

export const games: Game[] = [
  {
    id: "custom",
    name: "Custom",
    defaults: {
      maxScore: 0,
      allowDraws: true,
      ratingSystem: "elo",
    },
  },
];
