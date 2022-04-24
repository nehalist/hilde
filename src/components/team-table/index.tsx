import { FunctionComponent } from "react";
import { Team } from "@prisma/client";

const TeamTable: FunctionComponent<{ teams: Team[] }> = ({ teams }) => (
  <table className="w-full rounded-lg">
    <thead className="text-left">
      <tr className="bg-gray-200 text-sm">
        <th className="p-3">Name</th>
        <th className="p-3">Matches</th>
        <th className="p-3">Wins</th>
        <th className="p-3">Losses</th>
        <th className="p-3">Goals</th>
        <th className="p-3">Winrate</th>
        <th className="p-3">Rating</th>
      </tr>
    </thead>
    <tbody>
      {teams.map((team, index) => (
        <tr key={team.id} className={`${index % 2 === 0 ? "bg-gray-50" : ""} border-b`}>
          <td className={`p-3`}>{team.name}</td>
          <td className={`p-3`}>{team.matches}</td>
          <td className={`p-3`}>{team.wins}</td>
          <td className={`p-3`}>{team.matches - team.wins}</td>
          <td className={`p-3`}>{team.goals} <span className="text-sm text-gray-500">Ø {+Number(team.goals / team.matches).toFixed(2)}</span></td>
          <td className={`p-3`}>{+Number(team.wins / team.matches).toFixed(2) * 100}%</td>
          <td className={`p-3`}>{team.rating}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TeamTable;
