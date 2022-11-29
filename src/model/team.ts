/**
 * Keep in mind that there shouldn't be any server-related logic in this file, so it
 * can be imported client-side as well.
 */
import { Team } from "@prisma/client";
import { getCurrentSeason } from "~/utils/season";
import { defaultRating } from "~/utils/elo";

export interface TeamMetaDetails {
  matches: number;
  wins: number;
  winRate: number;
  losses: number;
  score: number;
  avgScore: number;
}

export interface TeamMeta {
  total: TeamMetaDetails & {
    highestRating: number;
    lowestRating: number;
    highestWinStreak: number;
    highestLosingStreak: number;
  };
  rating: number;
  achievementPoints: number;
  daily: TeamMetaDetails & {
    date: Date | null;
  };
  current: {
    winStreak: number;
    losingStreak: number;
  };
  achievements: Array<{
    id: string;
    earnedAt: Date;
    matchId: number;
  }>;
}

export function getDefaultTeamMeta() {
  return {
    total: {
      matches: 0,
      wins: 0,
      winRate: 0,
      losses: 0,
      score: 0,
      avgScore: 0,
      highestRating: defaultRating,
      lowestRating: defaultRating,
      highestWinStreak: 0,
      highestLosingStreak: 0,
    },
    rating: defaultRating,
    achievementPoints: 0,
    daily: {
      matches: 0,
      wins: 0,
      winRate: 0,
      losses: 0,
      score: 0,
      avgScore: 0,
      date: null,
    },
    current: {
      winStreak: 0,
      losingStreak: 0,
    },
    achievements: [],
  };
}

export function getTeamMeta(team?: Team) {
  const currentSeason = getCurrentSeason();

  if (!team) {
    return {
      version: 1,
      [currentSeason]: getDefaultTeamMeta(),
    };
  }

  const meta = JSON.parse(team.meta) as TeamMeta | undefined;

  if (!meta) {
    return {
      version: 1,
      [currentSeason]: getDefaultTeamMeta(),
    };
  }

  return {
    ...meta,
    [currentSeason]: meta[currentSeason] || getDefaultTeamMeta(),
  };
}

export function getSeasonMeta(team: Team, season: number) {
  const meta = getTeamMeta(team);
  return meta[season];
}

export function getCurrentSeasonMeta(team: Team) {
  return getSeasonMeta(team, getCurrentSeason());
}

export function getTeamSize(teamName: string) {
  return teamName.split(",").length;
}
