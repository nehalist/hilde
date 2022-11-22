import { Match, Team } from "@prisma/client";
import { getTeamMeta } from "~/model/team";
import { defaultRating } from "~/utils/elo";

export interface Achievement {
  id: string;
  condition: (team: Team, opponent: Team, match: Match) => boolean;
  title: string;
  description: string;
  points: number;
}

export const achievements: Achievement[] = [
  {
    id: "wins-1",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.wins >= 1;
    },
    title: "First Win",
    description: "Win your first game",
    points: 10,
  },
  {
    id: "wins-10",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.wins >= 10;
    },
    title: "10 Wins",
    description: "Win 10 matches",
    points: 10,
  },
  {
    id: "wins-50",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.wins >= 50;
    },
    title: "50 Wins",
    description: "Win 50 games",
    points: 10,
  },
  {
    id: "wins-100",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.wins >= 100;
    },
    title: "100 Wins",
    description: "Win 100 matches",
    points: 25,
  },
  {
    id: "wins-500",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.wins >= 500;
    },
    title: "500 Wins",
    description: "Win 500 matches",
    points: 25,
  },
  {
    id: "wins-1000",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.wins >= 1000;
    },
    title: "Winning is my hobby",
    description: "Win 1000 matches",
    points: 50,
  },
  {
    id: "elo-range",
    condition: team => {
      const meta = getTeamMeta(team);
      return (
        meta.total.lowestRating <= defaultRating - 300 &&
        meta.total.highestRating >= defaultRating + 300
      );
    },
    title: "Exkarlibur",
    description: `Reach an elo rating of lower than ${
      defaultRating - 300
    } AND at least ${defaultRating + 300}`,
    points: 50,
  },
  {
    id: "elo-minus300",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.lowestRating <= defaultRating - 300;
    },
    title: "It's evolving, just backwards!",
    description: `Reach an elo rating of ${defaultRating - 300}`,
    points: 25,
  },
  {
    id: "elo-100",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.highestRating >= defaultRating + 100;
    },
    title: "I'm getting better!",
    description: `Reach an elo rating of ${defaultRating + 100}`,
    points: 10,
  },
  {
    id: "elo-200",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.highestRating >= defaultRating + 200;
    },
    title: "Look mom, no hands!",
    description: `Reach an elo rating of ${defaultRating + 200}`,
    points: 10,
  },
  {
    id: "elo-300",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.highestRating >= defaultRating + 300;
    },
    title: "Whenever I need expert advice, I talk to myself",
    description: `Reach a rating of ${defaultRating + 300}`,
    points: 25,
  },
  {
    id: "elo-400",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.highestRating >= defaultRating + 400;
    },
    title: "Call me Magnus Carlsen",
    description: `Reach a rating of ${defaultRating + 400}`,
    points: 25,
  },
  {
    id: "elo-500",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.highestRating >= defaultRating + 500;
    },
    title: "Kneel before me, mortals!",
    description: `Reach a rating of ${defaultRating + 500}`,
    points: 50,
  },
  {
    id: "consecutive-wins-5",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.highestWinStreak >= 5;
    },
    title: "I am inevitable",
    description: `Win 5 consecutive games`,
    points: 25,
  },
  {
    id: "consecutive-wins-10",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.highestWinStreak >= 10;
    },
    title: "Behold!",
    description: `Win 10 consecutive games`,
    points: 50,
  },
  {
    id: "consecutive-losses-10",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.highestLosingStreak >= 10;
    },
    title: "Are you even trying?",
    description: `Lose 10 consecutive games`,
    points: 10,
  },
  {
    id: "matches-1",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.matches >= 1;
    },
    title: "First match",
    description: `Play your first match`,
    points: 10,
  },
  {
    id: "matches-10",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.matches >= 10;
    },
    title: "10 Matches",
    description: `Play 10 matches`,
    points: 10,
  },
  {
    id: "matches-50",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.matches >= 50;
    },
    title: "50 Matches",
    description: `Play 50 matches`,
    points: 10,
  },
  {
    id: "matches-100",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.matches >= 100;
    },
    title: "100 Matches",
    description: `Play 100 matches`,
    points: 25,
  },
  {
    id: "matches-500",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.matches >= 500;
    },
    title: "500 Matches",
    description: `Play 500 matches`,
    points: 25,
  },
  {
    id: "matches-1000",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.matches >= 1000;
    },
    title: "I haven't left this place for years",
    description: `Play 1000 matches`,
    points: 50,
  },
  {
    id: "score-1",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.score >= 1;
    },
    title: "First point",
    description: `Score your first point`,
    points: 10,
  },
  {
    id: "score-10",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.score >= 10;
    },
    title: "10 Points",
    description: `Score a total of 10 points`,
    points: 10,
  },
  {
    id: "score-100",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.score >= 100;
    },
    title: "100 Points", // TODO
    description: `Score a total of 100 points`,
    points: 25,
  },
  {
    id: "score-1000",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.score >= 1000;
    },
    title: "1000 Points", // TODO
    description: `Score a total of 1000 points`,
    points: 25,
  },
  {
    id: "score-2500",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.score >= 2500;
    },
    title: "2500 Points", // TODO
    description: `Score a total of 2500 points`,
    points: 50,
  },
  {
    id: "score-5000",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.total.score >= 2500;
    },
    title: "score 5000", // TODO
    description: `Score a total of 2500 points`,
    points: 50,
  },
  {
    id: "underdog",
    condition: (team, opponent) => {
      return opponent.rating - 100 >= team.rating;
    },
    title: "Underdog",
    description:
      "Win a game against someone at least 100 points higher than you",
    points: 25,
  },
  {
    id: "badday",
    condition: (team, opponent) => {
      return opponent.rating - team.rating >= 100;
    },
    title: "Bad days happen",
    description:
      "Lose a game against someone at least 100 points lower than you",
    points: 25,
  },
  {
    id: "david",
    condition: (team, opponent) => {
      return opponent.rating - 250 >= team.rating;
    },
    title: "David",
    description:
      "Win a game against someone at least 250 points higher than you",
    points: 50,
  },
  {
    id: "goliath",
    condition: (team, opponent) => {
      return opponent.rating - team.rating >= 250;
    },
    title: "Goliath",
    description:
      "Lose a game against someone at least 250 points lower than you",
    points: 10,
  },
  {
    id: "weekend-match",
    condition: (team, opponent, match) => {
      return match.createdAt.getDay() === 0 || match.createdAt.getDay() === 6;
    },
    title: "Everyday is work day",
    description: "Play a match on a weekend",
    points: 10,
  },
  {
    id: "night-match",
    condition: (team, opponent, match) => {
      return (
        match.createdAt.getHours() >= 20 && match.createdAt.getHours() <= 6
      );
    },
    title: "Night shift",
    description: "Play a match during the night",
    points: 10,
  },
  {
    id: "xmas-match",
    condition: (team, opponent, match) => {
      return (
        match.createdAt.getHours() >= 20 && match.createdAt.getHours() <= 6
      );
    },
    title: "Merry Christmas",
    description: "Play a game on Christmas eve (24.12.)",
    points: 10,
  },
  {
    id: "daily-matches-5",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.daily.matches >= 5;
    },
    title: "No-stress-day",
    description: "Play 5 matches in a single day",
    points: 10,
  },
  {
    id: "daily-matches-10",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.daily.matches >= 10;
    },
    title: "Are you even working?",
    description: "Play 10 matches in a single day",
    points: 25,
  },
  {
    id: "daily-wins-5",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.daily.wins >= 5;
    },
    title: "Probably getting paid for this",
    description: "Win 5 matches in a single day",
    points: 10,
  },
  {
    id: "daily-wins-10",
    condition: team => {
      const meta = getTeamMeta(team);
      return meta.daily.wins >= 10;
    },
    title: "Suffering from success",
    description: "Win 10 matches in a single day",
    points: 25,
  },
  {
    id: "hangover",
    condition: (team, opponent, match) => {
      return match.createdAt.getDay() === 4;
    },
    title: "Berliner Luft",
    description: "Play a match on a thursday",
    points: 25,
  },
  {
    id: "contributor",
    condition: team => {
      return ["kh", "dl"].includes(team.name);
    },
    title: "I'm doing my part",
    description: "Contribute to Hilde",
    points: 10,
  },
  {
    id: "daily-o-clock",
    condition: (team, opponent, match) => {
      return (
        match.createdAt.getHours() >= 10 && match.createdAt.getHours() <= 11
      );
    },
    title: "No daily today?",
    description: "Play a match between 09:00 and 09:15",
    points: 10,
  },
  // TODO: diff-50, diff-max, diff-min
];

export function checkAchievements(
  team: Team,
  opponent: Team,
  match: Match,
): Achievement[] {
  const teamAchievements = getTeamMeta(team).achievements;
  return achievements.filter(achievement => {
    if (teamAchievements.find(a => a.id === achievement.id)) {
      return false;
    }
    return achievement.condition(team, opponent, match);
  });
}
