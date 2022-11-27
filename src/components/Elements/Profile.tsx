import { FunctionComponent, useMemo } from "react";
import { Card } from "~/components/Elements/Card";
import { EloHistory } from "~/components/Elements/EloHistory";
import { AchievementList } from "~/components/Elements/AchievementList";
import { Match, Team } from "@prisma/client";
import { getTeamMeta, TeamMetaDetails } from "~/model/team";

export const Profile: FunctionComponent<{
  team: Team;
  versus?: Team | null;
  matches?: Match[];
  onVersusSelect: (teamName: string) => void;
  versusOptions: Team[];
}> = ({ team, versus, matches, onVersusSelect, versusOptions }) => {
  const meta = getTeamMeta(team);
  const vsMeta = versus ? getTeamMeta(versus) : undefined;

  const versusStats = useMemo((): TeamMetaDetails | null => {
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
      matches: playedMatches.length,
      wins,
      winRate: playedMatches.length === 0 ? 0 : wins / playedMatches.length,
      losses: playedMatches.length - wins,
      score,
      avgScore: score / playedMatches.length,
    };
  }, [team, versus, matches]);

  const stat = (stat: keyof TeamMetaDetails, float = false) => {
    let value = versus && versusStats ? versusStats[stat] : meta.total[stat];
    if (!value) {
      return 0;
    }
    if (stat === "winRate") {
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

  return (
    <Card>
      <div className="grid grid-cols-6 relative">
        <div className="col-span-6 bg-gray-100 dark:bg-gray-600 flex items-center justify-between rounded-t px-3 sticky top-0 z-50">
          <h2 className="bg-white px-2 font-semibold text-2xl my-5 text-gray-800 rounded-lg block">
            {team.name}
          </h2>
          <div>
            {versus && ("vs.")}
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
                {team.rating.toFixed(2)}
                <small className="opacity-50 ml-1">
                  {versus?.rating.toFixed(2)}
                </small>
              </h3>
              <p className="text-sm">Current Rating</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {meta.total.highestRating.toFixed(2)}
                <small className="opacity-50 ml-1">
                  {vsMeta?.total.highestRating.toFixed(2)}
                </small>
              </h3>
              <p className="text-sm">Highest Rating</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {meta.total.lowestRating.toFixed(2)}
                <small className="opacity-50 ml-1">
                  {vsMeta?.total.lowestRating.toFixed(2)}
                </small>
              </h3>
              <p className="text-sm">Lowest Rating</p>
            </div>
            <div className="col-span-3 border-b -m-3 my-2 dark:border-gray-600" />
            <div>
              <h3 className="font-semibold">{stat("matches")}</h3>
              <p className="text-sm">Matches</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("wins")}</h3>
              <p className="text-sm">Wins</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("losses")}</h3>
              <p className="text-sm">Losses</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("score")}</h3>
              <p className="text-sm">Total score</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("avgScore", true)}</h3>
              <p className="text-sm">Average score</p>
            </div>
            <div>
              <h3 className="font-semibold">{stat("winRate", true)}%</h3>
              <p className="text-sm">Winrate</p>
            </div>
            <div className="col-span-3 border-b -mx-3 my-2 dark:border-gray-600" />
            <div>
              <h3 className="font-semibold">
                {meta.current.winStreak}
                <small className="opacity-50 ml-1">
                  {vsMeta?.current.winStreak}
                </small>
              </h3>
              <p className="text-sm">Current winstreak</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {meta.total.highestWinStreak}
                <small className="opacity-50 ml-1">
                  {vsMeta?.total.highestWinStreak}
                </small>
              </h3>
              <p className="text-sm">Highest winstreak</p>
            </div>
            <div>
              <h3 className="font-semibold">
                {meta.total.highestLosingStreak}
                <small className="opacity-50 ml-1">
                  {vsMeta?.total.highestLosingStreak}
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
          <AchievementList team={team} versus={versus || undefined} />
        </div>
      </div>
    </Card>
  );
};
