import { FunctionComponent } from "react";
import { Match } from "@prisma/client";
import { formatDistance } from "date-fns";
import RatingChange from '../rating-change';

const MatchTable: FunctionComponent<{ matches: Match[] }> = ({ matches }) => (
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
      {matches.map((match, index) => (
        <tr key={match.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
          <td className={`p-3`}>
            {match.team1} {match.score1 > match.score2 ? "🏆" : ""} <RatingChange rating={match.rating1} />
          </td>
          <td className={`p-3`}>
            {match.team2} {match.score2 > match.score1 ? "🏆" : ""} <RatingChange rating={match.rating2} />
          </td>
          <td className="p-3">
            {match.score1}:{match.score2}
            {match.comment !== '' && (
              <div className="text-xs text-gray-500">{match.comment}</div>
            )}
          </td>
          <td className="p-3">
            {formatDistance(new Date(match.createdAt), new Date(), {
              addSuffix: true,
            })}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MatchTable;
