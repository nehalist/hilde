export interface Statistic {
  total: number;
  teams: Array<{
    name: string;
    games: number;
    wins: number;
    losses: number;
    goals: number;
    avgGoals: number;
    winrate: number;
    opponents: Array<{
      name: string;
      games: number;
      wins: number;
      losses: number;
      goals: number;
      avgGoals: number;
      winrate: number;
    }>;
  }>;
}
