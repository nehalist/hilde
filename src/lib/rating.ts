export enum RatingSystem {
  Elo = "elo",
  Glicko2 = "glicko2",
}

export const ratingSystems = [
  {
    id: RatingSystem.Elo,
    name: "Elo",
    description:
      "The Elo rating system is a method for calculating the relative skill levels of players in zero-sum games such as chess.",
    parameters: [
      {
        id: "kFactor",
        name: "K-Factor",
        description: "The maximum change in rating for a single game.",
        defaultValue: 32,
      },
    ],
  },
  {
    id: RatingSystem.Glicko2,
    name: "Glicko-2",
    description:
      "Glicko-2 is an extension of the Glicko rating system, which was itself an improvement of the Elo rating system.",
    parameters: [
      {
        id: "tau",
        name: "Tau",
        description:
          "The constraining factor on the change in volatility over time. Recommended: 0.01 - 1",
        defaultValue: 0.5,
      },
      {
        id: "ratingDeviation",
        name: "Rating Deviation",
        description: "The initial rating deviation. Recommended: 10 - 1000",
        defaultValue: 350,
      },
      {
        id: "ratingVolatility",
        name: "Rating Volatility",
        description: "The initial rating volatility. Recommended: 0.001 - 1",
        defaultValue: 0.06,
      },
    ],
  },
] as const;

export const getDefaultRatingSystemParameters = (
  ratingSystem: RatingSystem,
) => {
  const ratingSystemData = ratingSystems.find(
    ratingSystemData => ratingSystemData.id === ratingSystem,
  );

  if (!ratingSystemData) {
    throw new Error(`Unknown rating system: ${ratingSystem}`);
  }

  return ratingSystemData.parameters.reduce(
    (parameters, parameter) => ({
      ...parameters,
      [parameter.id]: parameter.defaultValue,
    }),
    {},
  );
};

export const validateRatingSystemParameters = (
  ratingSystem: RatingSystem,
  parameters: Record<string, number>,
) => {
  const ratingSystemData = ratingSystems.find(
    ratingSystemData => ratingSystemData.id === ratingSystem,
  );

  if (!ratingSystemData) {
    return false;
  }

  for (const parameter of ratingSystemData.parameters) {
    if (typeof parameters[parameter.id] !== "number") {
      return false;
    }
  }

  return true;
};
