/**
 * Keep in mind that there shouldn't be any server-related logic in this file, so it
 * can be imported client-side as well.
 */
import { Team } from "@prisma/client";

interface TeamMetaDetails {
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
  daily: TeamMetaDetails & {
    date: Date | null;
  };
  current: {
    winStreak: number;
    losingStreak: number;
  };
  version: number;
  achievements: Array<{
    id: string;
    earnedAt: Date;
    matchId: number;
  }>;
}

export function getTeamMeta(team: Team): TeamMeta {
  const meta = JSON.parse(team.meta) as Partial<TeamMeta> | undefined;
  return {
    total: {
      matches: meta?.total?.matches || 0,
      wins: meta?.total?.wins || 0,
      winRate: meta?.total?.winRate || 0,
      highestWinStreak: meta?.total?.highestWinStreak || 0,
      losses: meta?.total?.losses || 0,
      highestLosingStreak: meta?.total?.highestLosingStreak || 0,
      score: meta?.total?.score || 0,
      avgScore: meta?.total?.avgScore || 0,
      highestRating: meta?.total?.highestRating || team.rating,
      lowestRating: meta?.total?.lowestRating || team.rating,
    },
    daily: {
      matches: meta?.daily?.matches || 0,
      wins: meta?.daily?.wins || 0,
      winRate: meta?.daily?.winRate || 0,
      losses: meta?.daily?.losses || 0,
      score: meta?.daily?.score || 0,
      avgScore: meta?.daily?.avgScore || 0,
      date: meta?.daily?.date ? new Date(meta.daily.date) : null,
    },
    current: {
      winStreak: meta?.current?.winStreak || 0,
      losingStreak: meta?.current?.losingStreak || 0,
    },
    achievements: meta?.achievements || [],
    version: 1,
  };
}

export function getTeamSize(teamName: string) {
  return teamName.split(",").length;
}
