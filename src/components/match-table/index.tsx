import { FunctionComponent } from "react";
import { Match } from "@prisma/client";
import { formatDistance } from "date-fns";
import RatingChange from "../rating-change";
import { TiDeleteOutline } from "react-icons/ti";
import {useMutation, useQueryClient} from "react-query";
import { toast } from "react-toastify";

const MatchTable: FunctionComponent<{
  matches: Match[];
  onDelete?: (match: Match) => void;
}> = ({ matches, onDelete }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (id: number) => {
      return await fetch(`/api/matches/${id}`, {
        method: "DELETE",
      }).then(res => res.json());
    },
    {
      onSuccess: match => {
        toast("Its gone. Forever.", {
          type: "success",
        });
        const existing = queryClient.getQueryData<Match[]>(["matches"]);
        queryClient.setQueryData(
          ["matches"],
          existing?.filter(m => m.id !== match.id),
        );
        if (onDelete) {
          onDelete(match);
        }
      },
    },
  );

  return (
    <table className="w-full rounded-lg">
      <thead className="text-left">
        <tr className="bg-gray-200 text-sm">
          <th className="p-3 w-1/4">Team 1</th>
          <th className="p-3 w-1/4">Team 2</th>
          <th className="p-3 w-1/5">Result</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match, index) => (
          <tr
            key={match.id}
            className={`${index % 2 === 0 ? "bg-gray-50" : ""} group`}
          >
            <td className={`p-3`}>
              {match.team1} {match.score1 > match.score2 ? "🏆" : ""}{match.score1 === 0 ? '🪡' : ''}{" "}
              <RatingChange rating={match.rating1} />
            </td>
            <td className={`p-3`}>
              {match.team2} {match.score2 > match.score1 ? "🏆" : ""}{match.score2 === 0 ? '🪡' : ''}{" "}
              <RatingChange rating={match.rating2} />
            </td>
            <td className="p-3">
              {match.score1}:{match.score2}
              {match.comment !== "" && (
                <div className="text-xs text-gray-500">{match.comment}</div>
              )}
            </td>
            <td className="p-3">
              {formatDistance(new Date(match.createdAt), new Date(), {
                addSuffix: true,
              })}
              <button
                className="group-hover:opacity-100 opacity-0 transition-opacity mx-3 text-red-500"
                onClick={() => {
                  if (
                    window.confirm(
                      `Match ${match.team1} vs ${match.team2} resulting ${match.score1}:${match.score2} will be eradicated from existence - sure about that?`,
                    )
                  ) {
                    mutation.mutate(match.id);
                  }
                }}
              >
                <TiDeleteOutline />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatchTable;
