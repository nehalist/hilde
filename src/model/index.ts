export interface Statistic {
  total: number;
  teams: Array<{
    name: string;
    matches: number;
    wins: number;
    losses: number;
    goals: number;
    avgGoals: number;
    winrate: number;
    opponents: Array<{
      name: string;
      matches: number;
      wins: number;
      losses: number;
      goals: number;
      avgGoals: number;
      winrate: number;
    }>;
  }>;
}
