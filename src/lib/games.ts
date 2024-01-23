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

export const customGameId = "custom";

export const games: Game[] = [
  {
    id: customGameId,
    name: "Custom",
    defaults: {
      maxScorePerMatch: 0,
      allowDraws: true,
    },
  },
  {
    id: "foosball",
    name: "Foosball",
    defaults: {
      maxScorePerMatch: 10,
      allowDraws: false,
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
  {
    id: "chess",
    name: "Chess",
    defaults: {
      maxScorePerMatch: 1,
      allowDraws: true,
    }
  },
  {
    id: "pool",
    name: "Pool",
    defaults: {
      maxScorePerMatch: 1,
      allowDraws: false,
    }
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    defaults: {
      maxScorePerMatch: 7,
      allowDraws: false,
    }
  },
  {
    id: "sixty-six",
    name: "Sixty-Six (Schnapsen)",
    defaults: {
      maxScorePerMatch: 7,
      allowDraws: false,
    }
  },
];
