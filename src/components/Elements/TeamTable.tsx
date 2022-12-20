import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { trpc } from "~/utils/trpc";
import { getCurrentSeasonMeta } from "~/model";
import { TeamLink } from "~/components/Elements/TeamLink";
import { TeamWithMeta } from "~/server/model/team";

type TeamOrder =
  | "name"
  | "matches"
  | "wins"
  | "score"
  | "losses"
  | "winRate"
  | "achievementPoints"
  | "rating";

export const TeamTable: FunctionComponent<{ teams: TeamWithMeta[] }> = ({
  teams,
}) => {
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
      const meta1 = getCurrentSeasonMeta(team1);
      const meta2 = getCurrentSeasonMeta(team2);

      switch (orderBy) {
        case "name":
          return team1.name.localeCompare(team2.name);
        case "matches":
          return meta1.totalMatches - meta2.totalMatches;
        case "wins":
          return meta1.totalWins - meta2.totalWins;
        case "losses":
          return meta2.totalLosses - meta1.totalLosses;
        case "score":
          return meta2.totalScore - meta1.totalScore;
        case "winRate":
          return meta2.totalWinRate - meta1.totalWinRate;
        case "achievementPoints":
          return meta2.achievementPoints - meta1.achievementPoints;
        default:
        case "rating":
          return meta2.rating - meta1.rating;
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
          <th className="p-3" onClick={() => setOrdering("achievementPoints")}>
            Ach. {orderIcon("achievementPoints")}
          </th>
          <th className="p-3" onClick={() => setOrdering("rating")}>
            Rating {orderIcon("rating")}
          </th>
        </tr>
      </thead>
      <tbody>
        {orderedTeams
          .map(t => ({ ...t, meta: getCurrentSeasonMeta(t) }))
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
              <td className={`p-3`}>{team.meta.totalMatches}</td>
              <td className={`p-3`}>{team.meta.totalWins}</td>
              <td className={`p-3`}>{team.meta.totalLosses}</td>
              <td className={`p-3`}>
                {team.meta.totalScore}{" "}
                {team.meta.totalMatches > 0 && (
                  <span className="text-sm text-gray-500">
                    Ø {team.meta.totalAvgScore.toFixed(2)}
                  </span>
                )}
              </td>
              <td className={`p-3`}>
                {team.meta.totalMatches > 0 && (
                  <>{(team.meta.totalWinRate * 100).toFixed(2)}%</>
                )}
              </td>
              <td className={`p-3`}>{+team.meta.achievementPoints}</td>
              <td className={`p-3`}>{+team.meta.rating.toFixed(2)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
