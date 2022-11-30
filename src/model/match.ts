/**
 * Keep in mind that there shouldn't be any server-related logic in this file, so it
 * can be imported client-side as well.
 */
import { Match } from "@prisma/client";

export interface MatchMeta {
  achievements: {
    team1: string[];
    team2: string[];
  };
}

export function getMatchMeta(match: Match): MatchMeta {
  return {
    achievements: {
      team1: [],
      team2: [],
    },
  };
}
