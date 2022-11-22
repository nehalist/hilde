import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { Team } from "@prisma/client";
import { TiDeleteOutline } from "react-icons/ti";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { trpc } from "~/utils/trpc";
import { getTeamMeta } from "~/model/team";
import { TeamLink } from "~/components/Elements/TeamLink";

type TeamOrder =
  | "name"
  | "matches"
  | "wins"
  | "score"
  | "losses"
  | "winRate"
  | "rating";

export const TeamTable: FunctionComponent<{ teams: Team[] }> = ({ teams }) => {
  const [orderBy, setOrderBy] = useState<TeamOrder>("rating");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
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

  const orderedTeams = useMemo(() => {
    const ordered = teams.sort((team1, team2) => {
      const meta1 = getTeamMeta(team1);
      const meta2 = getTeamMeta(team2);

      switch (orderBy) {
        case "name":
          return team1.name.localeCompare(team2.name);
        case "matches":
          return meta1.total.matches - meta2.total.matches;
        case "wins":
          return meta1.total.wins - meta2.total.wins;
        case "losses":
          return meta2.total.losses - meta1.total.losses;
        case "score":
          return meta2.total.score - meta1.total.score;
        case "winRate":
          return meta2.total.winRate - meta1.total.winRate;
        default:
        case "rating":
          return team2.rating - team1.rating;
      }
    });

    if (order === "desc") {
      ordered.reverse();
    }

    return ordered;
  }, [teams, orderBy, order]);

  const setOrdering = (orderBy: TeamOrder) => {
    setOrderBy(orderBy);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const orderIcon = useCallback(
    header => {
      if (header !== orderBy) {
        return null;
      }
      return order === "asc" ? "▲" : "▼";
    },
    [order, orderBy],
  );

  return (
    <table className="w-full rounded-lg dark:bg-gray-700">
      <thead className="text-left">
        <tr className="bg-gray-200 dark:bg-gray-600 text-sm cursor-pointer">
          <th className="p-3" onClick={() => setOrdering("name")}>
            Name {orderIcon("name")}
          </th>
          <th className="p-3" onClick={() => setOrdering("matches")}>
            Matches {orderIcon("matches")}
          </th>
          <th className="p-3" onClick={() => setOrdering("wins")}>
            Wins {orderIcon("wins")}
          </th>
          <th className="p-3" onClick={() => setOrdering("losses")}>
            Losses {orderIcon("losses")}
          </th>
          <th className="p-3" onClick={() => setOrdering("score")}>
            Score {orderIcon("score")}
          </th>
          <th className="p-3" onClick={() => setOrdering("winRate")}>
            Winrate {orderIcon("winRate")}
          </th>
          <th className="p-3" onClick={() => setOrdering("rating")}>
            Rating {orderIcon("rating")}
          </th>
        </tr>
      </thead>
      <tbody>
        {orderedTeams
          .map(t => ({ ...t, meta: getTeamMeta(t) }))
          .map((team, index) => (
            <tr
              key={team.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
              } group`}
            >
              <td className={`p-3`}>
                <TeamLink team={team.name} />
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
              <td className={`p-3`}>{team.meta.total.matches}</td>
              <td className={`p-3`}>{team.meta.total.wins}</td>
              <td className={`p-3`}>{team.meta.total.losses}</td>
              <td className={`p-3`}>
                {team.meta.total.score}{" "}
                {team.meta.total.matches > 0 && (
                  <span className="text-sm text-gray-500">
                    Ø {team.meta.total.avgScore.toFixed(2)}
                  </span>
                )}
              </td>
              <td className={`p-3`}>
                {team.meta.total.matches > 0 && (
                  <>{(team.meta.total.winRate * 100).toFixed(2)}%</>
                )}
              </td>
              <td className={`p-3`}>{+team.rating.toFixed(2)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
