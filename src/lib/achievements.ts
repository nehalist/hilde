// import { Match, Team } from "@prisma/client";
// import { getSeasonMeta, getTeamSize } from "~/model";
// import { TeamWithMeta, TeamWithMetaAndAchievements } from "~/server/model/team";
// import { defaultRating } from "~/utils/elo";
// import { differenceInDays } from "date-fns";
//
import { Match, Team } from "@/db/schema";

export interface Achievement {
  id: string;
  title: string;
  condition: (team: Team, opponent: Team, match: Match) => boolean;
  description: string;
  points: number;
}

enum Result {
  Loss,
  Win,
}

function matchResult(team: Team, match: Match): Result {
  if (match.team1Id === team.id && match.score1 < match.score2) {
    return Result.Loss;
  }
  if (match.team2Id === team.id && match.score2 < match.score1) {
    return Result.Loss;
  }
  return Result.Win;
}

export const achievements: Achievement[] = [
  {
    id: "wins-1",
    condition: (team, opponent, match) => {
      return false;
    },
    title: "First win",
    description: "Win your first game",
    points: 10,
  },
];

//
// export const achievements: Achievement[] = [
//   {
//     id: "wins-1",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalWins >= 1;
//     },
//     title: "First Win",
//     description: "Win your first game",
//     points: 10,
//   },
//   {
//     id: "wins-10",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalWins >= 10;
//     },
//     title: "10 Wins",
//     description: "Win 10 matches",
//     points: 10,
//   },
//   {
//     id: "wins-50",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalWins >= 50;
//     },
//     title: "50 Wins",
//     description: "Win 50 games",
//     points: 10,
//   },
//   {
//     id: "wins-100",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalWins >= 100;
//     },
//     title: "100 Wins",
//     description: "Win 100 matches",
//     points: 25,
//   },
//   {
//     id: "wins-500",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalWins >= 500;
//     },
//     title: "500 Wins",
//     description: "Win 500 matches",
//     points: 25,
//   },
//   {
//     id: "wins-1000",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalWins >= 1000;
//     },
//     title: "Winning is my hobby",
//     description: "Win 1000 matches",
//     points: 50,
//   },
//   {
//     id: "elo-range",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return (
//         meta.totalLowestRating <= defaultRating - 300 &&
//         meta.totalHighestRating >= defaultRating + 300
//       );
//     },
//     title: "Exkarlibur",
//     description: `Reach an elo rating of lower than ${
//       defaultRating - 300
//     } AND at least ${defaultRating + 300}`,
//     points: 50,
//   },
//   {
//     id: "elo-minus300",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalLowestRating <= defaultRating - 300;
//     },
//     title: "It's evolving, just backwards!",
//     description: `Reach an elo rating of ${defaultRating - 300}`,
//     points: 25,
//   },
//   {
//     id: "elo-100",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalHighestRating >= defaultRating + 100;
//     },
//     title: "I'm getting better!",
//     description: `Reach an elo rating of ${defaultRating + 100}`,
//     points: 10,
//   },
//   {
//     id: "elo-200",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalHighestRating >= defaultRating + 200;
//     },
//     title: "Look mom, no hands!",
//     description: `Reach an elo rating of ${defaultRating + 200}`,
//     points: 10,
//   },
//   {
//     id: "elo-300",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalHighestRating >= defaultRating + 300;
//     },
//     title: "Whenever I need expert advice, I talk to myself",
//     description: `Reach a rating of ${defaultRating + 300}`,
//     points: 25,
//   },
//   {
//     id: "elo-400",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalHighestRating >= defaultRating + 400;
//     },
//     title: "Call me Magnus Carlsen",
//     description: `Reach a rating of ${defaultRating + 400}`,
//     points: 25,
//   },
//   {
//     id: "elo-500",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalHighestRating >= defaultRating + 500;
//     },
//     title: "Kneel before me, mortals!",
//     description: `Reach a rating of ${defaultRating + 500}`,
//     points: 50,
//   },
//   {
//     id: "consecutive-wins-5",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalHighestWinStreak >= 5;
//     },
//     title: "I am inevitable",
//     description: `Win 5 consecutive games`,
//     points: 25,
//   },
//   {
//     id: "consecutive-wins-10",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalHighestWinStreak >= 10;
//     },
//     title: "Behold!",
//     description: `Win 10 consecutive games`,
//     points: 50,
//   },
//   {
//     id: "consecutive-losses-10",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Win) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalHighestLosingStreak >= 10;
//     },
//     title: "Are you even trying?",
//     description: `Lose 10 consecutive games`,
//     points: 10,
//   },
//   {
//     id: "matches-1",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalMatches >= 1;
//     },
//     title: "First match",
//     description: `Play your first match`,
//     points: 10,
//   },
//   {
//     id: "matches-10",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalMatches >= 10;
//     },
//     title: "10 Matches",
//     description: `Play 10 matches`,
//     points: 10,
//   },
//   {
//     id: "matches-50",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalMatches >= 50;
//     },
//     title: "50 Matches",
//     description: `Play 50 matches`,
//     points: 10,
//   },
//   {
//     id: "matches-100",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalMatches >= 100;
//     },
//     title: "100 Matches",
//     description: `Play 100 matches`,
//     points: 25,
//   },
//   {
//     id: "matches-500",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalMatches >= 500;
//     },
//     title: "500 Matches",
//     description: `Play 500 matches`,
//     points: 25,
//   },
//   {
//     id: "matches-1000",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalMatches >= 1000;
//     },
//     title: "I haven't left this place for years",
//     description: `Play 1000 matches`,
//     points: 50,
//   },
//   {
//     id: "score-1",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalScore >= 1;
//     },
//     title: "First point",
//     description: `Score your first point`,
//     points: 10,
//   },
//   {
//     id: "score-10",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalScore >= 10;
//     },
//     title: "10 Points",
//     description: `Score a total of 10 points`,
//     points: 10,
//   },
//   {
//     id: "score-100",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalScore >= 100;
//     },
//     title: "100 Points",
//     description: `Score a total of 100 points`,
//     points: 25,
//   },
//   {
//     id: "score-1000",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalScore >= 1000;
//     },
//     title: "1000 Points",
//     description: `Score a total of 1000 points`,
//     points: 25,
//   },
//   {
//     id: "score-2500",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalScore >= 2500;
//     },
//     title: "2500 Points",
//     description: `Score a total of 2500 points`,
//     points: 50,
//   },
//   {
//     id: "score-5000",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.totalScore >= 2500;
//     },
//     title: "5000 Points",
//     description: `Score a total of 2500 points`,
//     points: 50,
//   },
//   {
//     id: "underdog",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       const opponentMeta = getSeasonMeta(opponent, match.season);
//       return opponentMeta.rating - meta.rating >= 100;
//     },
//     title: "Underdog",
//     description:
//       "Win a game against someone at least 100 points higher than you",
//     points: 25,
//   },
//   {
//     id: "badday",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Win) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       const opponentMeta = getSeasonMeta(opponent, match.season);
//       return meta.rating - opponentMeta.rating >= 100;
//     },
//     title: "Bad days happen",
//     description:
//       "Lose a game against someone at least 100 points lower than you",
//     points: 25,
//   },
//   {
//     id: "david",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       const opponentMeta = getSeasonMeta(opponent, match.season);
//       return opponentMeta.rating - 250 >= meta.rating;
//     },
//     title: "David",
//     description:
//       "Win a game against someone at least 250 points higher than you",
//     points: 50,
//   },
//   {
//     id: "goliath",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Win) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       const opponentMeta = getSeasonMeta(opponent, match.season);
//       return meta.rating - opponentMeta.rating >= 250;
//     },
//     title: "Goliath",
//     description:
//       "Lose a game against someone at least 250 points lower than you",
//     points: 10,
//   },
//   {
//     id: "weekend-match",
//     condition: (team, opponent, match) => {
//       return match.createdAt.getDay() === 0 || match.createdAt.getDay() === 6;
//     },
//     title: "Everyday is work day",
//     description: "Play a match on a weekend",
//     points: 10,
//   },
//   {
//     id: "night-match",
//     condition: (team, opponent, match) => {
//       return (
//         match.createdAt.getHours() >= 20 && match.createdAt.getHours() <= 6
//       );
//     },
//     title: "Night shift",
//     description: "Play a match during the night",
//     points: 10,
//   },
//   {
//     id: "xmas-match",
//     condition: (team, opponent, match) => {
//       return (
//         match.createdAt.getDate() === 24 && match.createdAt.getMonth() === 11
//       );
//     },
//     title: "Merry Christmas",
//     description: "Play a game on Christmas eve (24.12.)",
//     points: 10,
//   },
//   {
//     id: "daily-matches-5",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.dailyMatches >= 5;
//     },
//     title: "No-stress-day",
//     description: "Play 5 matches in a single day",
//     points: 10,
//   },
//   {
//     id: "daily-matches-10",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return meta.dailyMatches >= 10;
//     },
//     title: "Are you even working?",
//     description: "Play 10 matches in a single day",
//     points: 25,
//   },
//   {
//     id: "daily-wins-5",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.dailyWins >= 5;
//     },
//     title: "Probably getting paid for this",
//     description: "Win 5 matches in a single day",
//     points: 10,
//   },
//   {
//     id: "daily-wins-10",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const meta = getSeasonMeta(team, match.season);
//       return meta.dailyWins >= 10;
//     },
//     title: "Suffering from success",
//     description: "Win 10 matches in a single day",
//     points: 25,
//   },
//   {
//     id: "hangover",
//     condition: (team, opponent, match) => {
//       return match.createdAt.getDay() === 4;
//     },
//     title: "Berliner Luft",
//     description: "Play a match on a thursday",
//     points: 25,
//   },
//   {
//     id: "contributor",
//     condition: team => {
//       return ["kh", "dl", "al", "kk"].includes(team.name);
//     },
//     title: "I'm doing my part",
//     description: "Contribute to Hilde",
//     points: 10,
//   },
//   {
//     id: "daily-o-clock",
//     condition: (team, opponent, match) => {
//       return (
//         match.createdAt.getHours() === 8 &&
//         match.createdAt.getMinutes() >= 0 &&
//         match.createdAt.getMinutes() <= 15
//       );
//     },
//     title: "No daily today?",
//     description: "Play a match between 09:00 and 09:15",
//     points: 10,
//   },
//   {
//     id: "threesome",
//     condition: (team, opponent) => {
//       return getTeamSize(team.name) === 1 && getTeamSize(opponent.name) === 2;
//     },
//     title: "Have a threesome",
//     description: "Play 1 vs 2",
//     points: 10,
//   },
//   {
//     id: "bad-threesome",
//     condition: (team, opponent) => {
//       return getTeamSize(team.name) === 2 && getTeamSize(opponent.name) === 1;
//     },
//     title: "The bad kind of threesome",
//     description: "Play 2 vs 1",
//     points: 10,
//   },
//   {
//     id: "leap-year",
//     condition: (team, opponent, match) => {
//       return (
//         match.createdAt.getMonth() === 1 && match.createdAt.getDate() === 29
//       );
//     },
//     title: "Take a leap",
//     description: "Play on 29.2",
//     points: 25,
//   },
//   {
//     id: "vacation",
//     condition: (team, opponent, match) => {
//       const meta = getSeasonMeta(team, match.season);
//       return differenceInDays(new Date(), new Date(meta.updatedAt)) > 14;
//     },
//     title: "Take a vacation",
//     description: "Don't play for 14 days",
//     points: 10,
//   },
//   {
//     id: "trick-or-treat",
//     condition: (team, opponent, match) => {
//       return (
//         match.createdAt.getMonth() === 9 && match.createdAt.getDate() === 31
//       );
//     },
//     title: "Trick or treat",
//     description: "Play on 31.10.",
//     points: 10,
//   },
//   {
//     id: "diff-max",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Loss) {
//         return false;
//       }
//       const matchTeam = match.team1 === team.name ? "team1" : "team2";
//       return matchTeam === "team1" ? match.score2 === 0 : match.score1 === 0;
//     },
//     title: "Dominator",
//     description: "Win while your opponent score is 0",
//     points: 10,
//   },
//   {
//     id: "diff-min",
//     condition: (team, opponent, match) => {
//       if (matchResult(team, match) === Result.Win) {
//         return false;
//       }
//       const matchTeam = match.team1 === team.name ? "team1" : "team2";
//       return matchTeam === "team1" ? match.score1 === 0 : match.score2 === 0;
//     },
//     title: "Das tapfere Schneiderlein",
//     description: "Lose with 0 points",
//     points: 10,
//   },
// ];
//
// export function checkAchievements(
//   team: TeamWithMetaAndAchievements,
//   opponent: TeamWithMetaAndAchievements,
//   match: Match,
// ): Achievement[] {
//   const teamAchievements = team.achievements.filter(
//     a => a.season === match.season,
//   );
//   return achievements.filter(achievement => {
//     if (teamAchievements.find(a => a.achievement === achievement.id)) {
//       return false;
//     }
//     return achievement.condition(team, opponent, match);
//   });
// }
