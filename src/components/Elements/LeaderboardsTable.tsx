import { FunctionComponent, ReactElement, useCallback } from "react";
import { Leaderboards } from "~/model";
import { Card } from "~/components/Elements";

const PlaceIcon: FunctionComponent<{ place: number }> = ({ place }) => {
  switch (place) {
    case 1:
      return <span className="text-3xl">🥇</span>;
    case 2:
      return <span className="text-3xl">🥈</span>;
    case 3:
      return <span className="text-3xl">🥉</span>;
  }
  return null;
};

const LeaderboardsRow: FunctionComponent<{
  place: number;
  leaderboards: Leaderboards;
}> = ({ leaderboards, place }) => {
  const col = useCallback(
    (category: string, valueFormat?: (value) => ReactElement) => {
      const entry = leaderboards.places.find(
        p => p.place === place && p.category === category,
      );
      if (!entry) {
        console.log(leaderboards, place, category);
        return null;
      }
      return (
        <td className={`text-center`}>
          <div className="font-bold text-lg">{entry.team}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {valueFormat ? valueFormat(entry.value) : entry.value}
          </div>
        </td>
      );
    },
    [leaderboards, place],
  );

  return (
    <tr className="border-b dark:border-b-gray-600 last:border-b-0">
      <td className="text-center py-6">
        <PlaceIcon place={place} />
      </td>
      {col("wins")}
      {col("score")}
      {col("matches")}
      {col("winRate", v => (
        <>{(v * 100).toFixed(2)}%</>
      ))}
      {col("rating", v => (
        <>{v.toFixed(2)}</>
      ))}
    </tr>
  );
};

export const LeaderboardsTable: FunctionComponent<{
  leaderboards: Leaderboards;
}> = ({ leaderboards }) => {
  if (leaderboards.totalMatches.total === 0) {
    return <div>No matches played yet</div>;
  }

  return (
    <Card>
      <div className="p-6 flex justify-between">
        <div>
          Total Matches: <b>{leaderboards.totalMatches.total}</b>
        </div>
        <div>
          ~<b>{Math.round(leaderboards.totalMatches.perDay)}</b> matches per day
          ({Math.round(leaderboards.totalMatches.days)} days)
        </div>
      </div>
      <hr />
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-600 text-sm">
            <th className="w-1/6"></th>
            <th className="w-1/6 py-2">Wins</th>
            <th className="w-1/6 py-2">Score</th>
            <th className="w-1/6 py-2">Matches</th>
            <th className="w-1/6 py-2">Winrate</th>
            <th className="w-1/6 py-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2].map(place => (
            <LeaderboardsRow
              leaderboards={leaderboards}
              key={place}
              place={place + 1}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
};
