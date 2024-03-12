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
};

export const customGameId = "custom";

export const games: Game[] = [
  {
    id: customGameId,
    name: "Custom",
  },
  {
    id: "foosball",
    name: "Foosball",
  },
  {
    id: "badminton",
    name: "Badminton",
  },
  {
    id: "chess",
    name: "Chess",
  },
  {
    id: "pool",
    name: "Pool",
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
  },
  {
    id: "sixty-six",
    name: "Sixty-Six (Schnapsen)",
  },
];
