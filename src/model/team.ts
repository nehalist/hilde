/**
 * Keep in mind that there shouldn't be any server-related logic in this file, so it
 * can be imported client-side as well.
 */
import { getCurrentSeason } from "~/utils/season";
import { defaultRating } from "~/utils/elo";
import { TeamWithMeta } from "~/server/model/team";

export function getDefaultTeamMeta() {
  return {
    id: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    season: getCurrentSeason(),
    rating: defaultRating,
    achievementPoints: 0,
    totalMatches: 0,
    totalWins: 0,
    totalLosses: 0,
    totalScore: 0,
    totalAvgScore: 0,
    totalWinRate: 0,
    totalHighestRating: defaultRating,
    totalLowestRating: defaultRating,
    totalHighestWinStreak: 0,
    totalHighestLosingStreak: 0,
    dailyMatches: 0,
    dailyWins: 0,
    dailyLosses: 0,
    dailyScore: 0,
    dailyAvgScore: 0,
    dailyWinRate: 0,
    currentLosingStreak: 0,
    currentWinStreak: 0,
  };
}

export function getSeasonMeta(team: TeamWithMeta, season: number) {
  return team.meta.find(m => m.season === season) || getDefaultTeamMeta();
}

export function getCurrentSeasonMeta(team: TeamWithMeta) {
  return getSeasonMeta(team, getCurrentSeason());
}

export function getTeamSize(teamName: string) {
  return teamName.split(",").length;
}
