import { getTeamSize } from "@/db/model/team";
import { League, Match, Team } from "@/db/schema";
import { Achievement, achievementList } from "@/lib/achievements";
import { RatingSystem, getDefaultRatingSystemParameters } from "@/lib/rating";

function getAchievement(id: string): Achievement {
  return achievementList.find(a => a.id === id)!;
}

function createTeam(name: string, data?: Partial<Team>): Team {
  return {
    id: "0",
    name,
    createdAt: new Date(),
    teamsize: getTeamSize(name),
    achievements: [],
    ...data,
  };
}

const defaultRating = 1000;
const league: League = {
  id: "test-league",
  name: "Test League",
  description: "",
  image: "",
  defaultRating,
  ratingSystem: RatingSystem.Elo,
  ratingSystemParameters: getDefaultRatingSystemParameters(RatingSystem.Elo),
  game: "custom",
  status: "active",
  inviteCode: "test",
  ownerId: "test",
  createdAt: new Date(),
};

function createMatch(
  team1: Team,
  team2: Team,
  score1: number,
  score2: number,
): Match {
  return {
    id: "test-match",
    createdAt: new Date(),
    team1Id: team1.id,
    team2Id: team2.id,
    score1,
    score2,
    comment: "",
    team1Rating: 0,
    team1RatingChange: 0,
    team2Rating: 0,
    team2RatingChange: 0,
    leagueId: league.id,
    userId: "user-id",
  };
}

describe("underdog", () => {
  test("granted", () => {
    const achievement = getAchievement("underdog");
    const player = createTeam("player", {
      rating: 700,
    });
    const opponent = createTeam("opponent", {
      rating: 800,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 1, 0),
      league,
    );
    expect(granted).toBe(true);
  });

  test("granted alt", () => {
    const achievement = getAchievement("underdog");
    const player = createTeam("player", {
      rating: 1000,
    });
    const opponent = createTeam("opponent", {
      rating: 1400,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 1, 0),
    );
    expect(granted).toBe(true);
  });

  test("denied", () => {
    const achievement = getAchievement("underdog");
    const player = createTeam("player", {
      rating: 1000,
    });
    const opponent = createTeam("opponent", {
      rating: 1050,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 1, 0),
    );
    expect(granted).toBe(false);
  });

  test("denied reversed rating", () => {
    const achievement = getAchievement("underdog");
    const player = createTeam("player", {
      rating: 1000,
    });
    const opponent = createTeam("opponent", {
      rating: 800,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 1, 0),
    );
    expect(granted).toBe(false);
  });

  test("denied by result", () => {
    const achievement = getAchievement("underdog");
    const player = createTeam("player", {
      rating: 1000,
    });
    const opponent = createTeam("opponent", {
      rating: 1200,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 0, 1),
    );
    expect(granted).toBe(false);
  });
});

describe("badday", () => {
  test("granted", () => {
    const achievement = getAchievement("badday");
    const player = createTeam("player", {
      rating: 900,
    });
    const opponent = createTeam("opponent", {
      rating: 800,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 0, 1),
    );

    expect(granted).toBe(true);
  });

  test("granted alt", () => {
    const achievement = getAchievement("badday");
    const player = createTeam("player", {
      rating: 1400,
    });
    const opponent = createTeam("opponent", {
      rating: 900,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 0, 1),
    );

    expect(granted).toBe(true);
  });

  test("denied", () => {
    const achievement = getAchievement("badday");
    const player = createTeam("player", {
      rating: 1000,
    });
    const opponent = createTeam("opponent", {
      rating: 1200,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 0, 1),
    );

    expect(granted).toBe(false);
  });

  test("denied by result", () => {
    const achievement = getAchievement("badday");
    const player = createTeam("player", {
      rating: 1000,
    });
    const opponent = createTeam("opponent", {
      rating: 1100,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 1, 0),
    );

    expect(granted).toBe(false);
  });
});

describe("david", () => {
  test("granted", () => {
    const achievement = getAchievement("david");
    const player = createTeam("player", {
      rating: 700,
    });
    const opponent = createTeam("opponent", {
      rating: 950,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 1, 0),
    );
    expect(granted).toBe(true);
  });

  test("granted alt", () => {
    const achievement = getAchievement("david");
    const player = createTeam("player", {
      rating: 1000,
    });
    const opponent = createTeam("opponent", {
      rating: 1400,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 1, 0),
    );
    expect(granted).toBe(true);
  });

  test("denied", () => {
    const achievement = getAchievement("david");
    const player = createTeam("player", {
      rating: 1200,
    });
    const opponent = createTeam("opponent", {
      rating: 800,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 1, 0),
    );
    expect(granted).toBe(false);
  });

  test("denied by result", () => {
    const achievement = getAchievement("david");
    const player = createTeam("player", {
      rating: 1000,
    });
    const opponent = createTeam("opponent", {
      rating: 1200,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 0, 1),
    );
    expect(granted).toBe(false);
  });
});

describe("goliath", () => {
  test("granted", () => {
    const achievement = getAchievement("goliath");
    const player = createTeam("player", {
      rating: 950,
    });
    const opponent = createTeam("opponent", {
      rating: 700,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 0, 1),
    );
    expect(granted).toBe(true);
  });

  test("granted alt", () => {
    const achievement = getAchievement("goliath");
    const player = createTeam("player", {
      rating: 1400,
    });
    const opponent = createTeam("opponent", {
      rating: 1000,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 0, 1),
    );
    expect(granted).toBe(true);
  });

  test("denied", () => {
    const achievement = getAchievement("goliath");
    const player = createTeam("player", {
      rating: 1200,
    });
    const opponent = createTeam("opponent", {
      rating: 800,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 1, 0),
    );
    expect(granted).toBe(false);
  });

  test("denied by result", () => {
    const achievement = getAchievement("goliath");
    const player = createTeam("player", {
      rating: 1000,
    });
    const opponent = createTeam("opponent", {
      rating: 1400,
    });

    const granted = achievement.condition(
      player,
      opponent,
      createMatch(player, opponent, 0, 1),
    );
    expect(granted).toBe(false);
  });
});
