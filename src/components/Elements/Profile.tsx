import { FunctionComponent, useMemo } from "react";
import { Card } from "~/components/Elements/Card";
import { EloHistory } from "~/components/Elements/EloHistory";
import { Match, Team, TeamMeta } from "@prisma/client";
import { getCurrentSeasonMeta } from "~/model/team";
import { TeamWithMetaAndAchievements } from "~/server/model/team";
import { AchievementList } from "~/components/Elements/AchievementList";

export const Profile: FunctionComponent<{
  team: TeamWithMetaAndAchievements;
  versus?: TeamWithMetaAndAchievements | null;
  matches?: Match[];
  onVersusSelect: (teamName: string) => void;
  versusOptions: Team[];
}> = ({ team, versus, matches, onVersusSelect, versusOptions }) => {
  const meta = getCurrentSeasonMeta(team);
  const vsMeta = versus ? getCurrentSeasonMeta(versus) : undefined;

  const versusStats = useMemo((): Partial<TeamMeta> | null => {
    if (!matches || !versus) {
      return null;
    }
    const playedMatches = matches.filter(
      m => m.team1 === versus.name || m.team2 === versus.name,
    );
    const wins = matches.filter(
      m =>
        (m.team1 === team.name && m.score1 > m.score2) ||
        (m.team2 === team.name && m.score2 > m.score1),
    ).length;
    const score = playedMatches.reduce((acc, m) => {
      return acc + (m.team1 === team.name ? m.score1 : m.score2);
    }, 0);
    return {
      totalMatches: playedMatches.length,
      totalWins: wins,
      totalWinRate:
        playedMatches.length === 0 ? 0 : wins / playedMatches.length,
      totalLosses: playedMatches.length - wins,
      totalScore: score,
      totalAvgScore: score / playedMatches.length,
    };
  }, [team, versus, matches]);

  const stat = (stat: keyof TeamMeta, float = false) => {
    let value = versus && versusStats ? versusStats[stat] : meta[stat];
    if (!value) {
      return 0;
    }
    if (stat === "totalWinRate") {
      value *= 100;
    }
    if (float) {
      value = +value.toFixed(2);
    }
    if (versus) {
      return <i>{value}</i>;
    }
    return value;
  };

  if (!meta) {
    return null;
  }

  return (
    <Card>
      <div className="grid grid-cols-6 relative">
        <div className="col-span-6 bg-gray-100 dark:bg-gray-600 flex items-center justify-between rounded-t px-3 sticky top-0 z-50">
          <h2 className="bg-white px-2 font-semibold text-2xl my-5 text-gray-800 rounded-lg block">
            {team.name}
          </h2>
          <div>
            {versus && "vs."}
            <select
              className={`p-2 text-gray-800 bg-gray-300 dark:bg-gray-800 dark:text-gray-400 rounded-lg`}
              onChange={e => onVersusSelect(e.target.value)}
              value={versus?.name}
            >
              <option value="">Versus...</option>
              {versusOptions
                .filter(t => t.name !== team.name)
                .map(t => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-span-6 border-b dark:border-gray-600 pb-3">
          <div className="grid grid-cols-3 gap-3 p-3">
            <div>
              <h3 className="font-semibold">
                {meta.rating.toFixed(2)}
                <small className="opacity-50 ml-1">
                  {vsMeta?.rating.toFixed(2)}
                </small>
              </h3>
              <p className="text-sm">Current Rating</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {meta.totalHighestRating.toFixed(2)}
                <small className="opacity-50 ml-1">
                  {vsMeta?.totalHighestRating.toFixed(2)}
                </small>
              </h3>
              <p className="text-sm">Highest Rating</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {meta.totalLowestRating.toFixed(2)}
                <small className="opacity-50 ml-1">
                  {vsMeta?.totalLowestRating.toFixed(2)}
                </small>
              </h3>
              <p className="text-sm">Lowest Rating</p>
            </div>
            <div className="col-span-3 border-b -m-3 my-2 dark:border-gray-600" />
            <div>
              <h3 className="font-semibold">{stat("totalMatches")}</h3>
              <p className="text-sm">Matches</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("totalWins")}</h3>
              <p className="text-sm">Wins</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("totalLosses")}</h3>
              <p className="text-sm">Losses</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("totalScore")}</h3>
              <p className="text-sm">Total score</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("totalAvgScore", true)}</h3>
              <p className="text-sm">Average score</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("totalWinRate", true)}%</h3>
              <p className="text-sm">Winrate</p>
            </div>
            <div className="col-span-3 border-b -mx-3 my-2 dark:border-gray-600" />
            <div>
              <h3 className="font-semibold">
                {meta.currentWinStreak}
                <small className="opacity-50 ml-1">
                  {vsMeta?.currentWinStreak}
                </small>
              </h3>
              <p className="text-sm">Current winstreak</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {meta.totalHighestWinStreak}
                <small className="opacity-50 ml-1">
                  {vsMeta?.totalHighestWinStreak}
                </small>
              </h3>
              <p className="text-sm">Highest winstreak</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {meta.totalHighestLosingStreak}
                <small className="opacity-50 ml-1">
                  {vsMeta?.totalHighestLosingStreak}
                </small>
              </h3>
              <p className="text-sm">Highest losing streak</p>
            </div>
          </div>
        </div>
        <div className="col-span-6 h-52 border-t border-b dark:border-gray-600">
          {matches && matches.length > 0 ? (
            <EloHistory
              matches={matches}
              teams={[team.name, ...(versus ? [versus.name] : [])]}
            />
          ) : (
            <div className="h-52 flex justify-center items-center italic opacity-50">
              No matches found
            </div>
          )}
        </div>
        <div className="col-span-6 p-3">
          <div className="my-5 text-2xl font-semibold text-center">
            🏅 {meta.achievementPoints}
            <small className="opacity-50 ml-1">
              {vsMeta?.achievementPoints}
            </small>
          </div>
          <AchievementList team={team} versus={versus || undefined} />
        </div>
      </div>
    </Card>
  );
};
