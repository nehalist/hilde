export interface Leaderboards {
  season: number;
  totalMatches: {
    total: number;
    perDay: number;
    days: number;
  };
  places: Array<{
    category: "wins" | "score" | "matches" | "winRate" | "rating";
    team: string;
    value: number;
    place: number;
  }>;
}
