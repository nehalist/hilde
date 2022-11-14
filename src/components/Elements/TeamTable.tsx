import { FunctionComponent } from "react";
import { Team } from "@prisma/client";
import { TiDeleteOutline } from "react-icons/ti";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { trpc } from "~/utils/trpc";

export const TeamTable: FunctionComponent<{ teams: Team[] }> = ({ teams }) => {
  const queryClient = useQueryClient();
  const mutation = trpc.teams.delete.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast("Its gone. Forever.", {
        type: "success",
      });
    },
    onError: () => {
      toast("Failed to delete team.", {
        type: "error",
      });
    },
  });

  return (
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
          <tr
            key={team.id}
            className={`${index % 2 === 0 ? "bg-gray-50" : ""} border-b group`}
          >
            <td className={`p-3`}>
              {team.name}
              <button
                className="group-hover:opacity-100 opacity-0 transition-opacity mx-3 text-red-500"
                onClick={() => {
                  if (
                    window.prompt(
                      `Are you really sure? Please enter "${team.name}" to confirm.`,
                    ) === team.name
                  ) {
                    mutation.mutate({ id: team.id });
                  }
                }}
              >
                <TiDeleteOutline />
              </button>
            </td>
            <td className={`p-3`}>{team.matches}</td>
            <td className={`p-3`}>{team.wins}</td>
            <td className={`p-3`}>{team.matches - team.wins}</td>
            <td className={`p-3`}>
              {team.goals}{" "}
              {team.matches > 0 && (
                <span className="text-sm text-gray-500">
                  Ø {+Number(team.goals / team.matches).toFixed(2)}
                </span>
              )}
            </td>
            <td className={`p-3`}>
              {team.matches > 0 && (
                <>{(+Number(team.wins / team.matches) * 100).toFixed(2)}%</>
              )}
            </td>
            <td className={`p-3`}>{+team.rating.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
