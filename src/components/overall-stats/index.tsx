import { FunctionComponent } from "react";
import { Statistic } from "../../model";
import { Card } from "../card";
import { differenceInDays } from "date-fns";

const winnersForCategory = (items: Statistic["teams"], category: string) => {
  return items.sort((a, b) => b[category] - a[category]).slice(0, 3);
};

const Position: FunctionComponent<{ position: number }> = ({ position }) => {
  switch (position) {
    case 1:
      return <span className="text-3xl">🥇</span>;
    case 2:
      return <span className="text-3xl">🥈</span>;
    case 3:
      return <span className="text-3xl">🥉</span>;
  }
  return null;
};

const WinnerRow: FunctionComponent<{
  items: Statistic["teams"];
  position: number;
}> = ({ items, position }) => {
  const winnerCategory = winnersForCategory(items, "wins");
  const goalsCategory = winnersForCategory(items, "goals");
  const winrateCategory = winnersForCategory(items, "winrate");
  const lossesCategory = winnersForCategory(items, "losses");

  const col = (label: string, value: any, background = false) => (
    <td className={`text-center ${background ? 'bg-gray-50' : ''}`}>
      <div className="font-bold text-lg">{label}</div>
      <div className="text-xs text-gray-500">
        {value}
      </div>
    </td>
  );

  return (
    <tr className="border-b">
      <td className="text-center py-6">
        <Position position={position + 1} />
      </td>
      {winnerCategory[position] ? (
        <>{col(winnerCategory[position].name, winnerCategory[position].wins, true)}</>
      ) : <td></td>}
      {goalsCategory[position] ? (
        <>{col(goalsCategory[position].name, goalsCategory[position].goals)}</>
      ) : <td></td>}
      {winrateCategory[position] ? (
        <>{col(winrateCategory[position].name, (Math.round(winrateCategory[position].winrate * 100)) + '%', true)}</>
      ) : <td></td>}
      {lossesCategory[position] ? (
        <>{col(lossesCategory[position].name, lossesCategory[position].goals)}</>
      ) : <td></td>}
    </tr>
  );
};

const date = new Date();
const OverallStats: FunctionComponent<{ stats: Statistic }> = ({ stats }) => {
  const monthDays = differenceInDays(
    date,
    new Date(`${date.getFullYear()}-${date.getMonth() + 1}-01`),
  );

  return (
    <Card>
      <div className="p-6 flex justify-between">
        <div>
          Total Matches: <b>{stats.total}</b>
        </div>
        {stats.total > 0 && (
          <div>
            ~<b>{Math.round(stats.total / (monthDays + 1))}</b> matches per day
          </div>
        )}
      </div>
      <hr />
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200 text-sm">
            <th className="w-1/5"></th>
            <th className="w-1/5 py-1 text-gray-800">Wins</th>
            <th className="w-1/5 py-1 text-gray-800">Goals</th>
            <th className="w-1/5 py-1 text-gray-800">Winrate</th>
            <th className="w-1/5 py-1 text-gray-800">Losses</th>
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2].map(position => (
            <WinnerRow items={stats.teams} key={position} position={position} />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default OverallStats;
