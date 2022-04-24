import { FunctionComponent } from "react";
import { Team } from "@prisma/client";

const TeamTable: FunctionComponent<{ teams: Team[] }> = ({ teams }) => (
  <table className="w-full rounded-lg">
    <thead className="text-left">
      <tr className="bg-gray-200 text-sm">
        <th className="p-3 w-3/4">Name</th>
        <th className="p-3 w-1/4">Rating</th>
      </tr>
    </thead>
    <tbody>
      {teams.map((team, index) => (
        <tr key={team.id} className={index % 2 === 0 ? "bg-gray-50" : ""}>
          <td className={`p-3`}>{team.name}</td>
          <td className={`p-3`}>{team.rating}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TeamTable;
