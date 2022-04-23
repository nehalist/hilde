import { FunctionComponent } from "react";
import { Match } from "@prisma/client";
import {formatDistance} from 'date-fns';

const History: FunctionComponent<{ matches: Match[] }> = ({matches}) => {
  return (
    <table className="w-full rounded-lg">
      <thead className="text-left">
      <tr className="bg-gray-200 text-sm">
        <th className="p-3 w-1/4">Team 1</th>
        <th className="p-3 w-1/4">Team 2</th>
        <th className="p-3 w-1/4">Result</th>
        <th className="p-3 w-1/4">Date</th>
      </tr>
      </thead>
      <tbody>
      {matches.map(match => (
        <tr key={match.id}>
          <td
            className={`${
              match.score1 > match.score2 ? "bg-green-50" : ""
            } p-3`}
          >
            {match.team1}
          </td>
          <td
            className={`${
              match.score2 > match.score1 ? "bg-green-50" : ""
            } p-3`}
          >
            {match.team2}
          </td>
          <td className="p-3">
            {match.score1}:{match.score2}
          </td>
          <td className="p-3">
            {formatDistance(new Date(match.createdAt), new Date())}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};

export default History;
