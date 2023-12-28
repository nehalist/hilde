// We might use this type in the future, but for now it's not needed.
// type RatingSystemConfig<
//   S extends typeof ratingSystems[number] = typeof ratingSystems[number],
// > = S extends unknown
//   ? {
//       ratingSystem: S["id"];
//       ratingSystemParameters: Record<S["parameters"][number]["id"], number>;
//     }
//   : never;

export type Game = {
  id: string;
  name: string;
  defaults: {
    maxScorePerMatch: number;
    allowDraws: boolean;
  };
};

export const games: Game[] = [
  {
    id: "custom",
    name: "Custom",
    defaults: {
      maxScorePerMatch: 0,
      allowDraws: true,
    },
  },
  {
    id: "badminton",
    name: "Badminton",
    defaults: {
      maxScorePerMatch: 21,
      allowDraws: false,
    },
  },
];
