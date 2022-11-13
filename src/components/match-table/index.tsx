import { FunctionComponent } from "react";
import { Match } from "@prisma/client";
import RatingChange from "../rating-change";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import TimeDistance from "../time-distance";
import { trpc } from "~/utils/trpc";

const MatchTable: FunctionComponent<{
  matches: Match[];
}> = ({ matches }) => {
  const utils = trpc.useContext();
  const deleteMutation = trpc.matches.delete.useMutation({
    onSuccess: async () => {
      await utils.matches.invalidate();
      toast("Its gone. Forever.", {
        type: "success",
      });
    },
  });

  if (matches.length === 0) {
    return null;
  }

  return (
    <table className="w-full rounded-lg">
      <thead className="text-left">
        <tr className="bg-gray-200 text-sm">
          <th className="p-3 w-1/4">Team 1</th>
          <th className="p-3 w-1/4">Team 2</th>
          <th className="p-3 w-32">Result</th>
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
              {match.team1} {match.score1 > match.score2 ? "🏆" : ""}
              {match.score1 === 0 ? "✂️" : ""}{" "}
              <RatingChange rating={match.rating1} />
            </td>
            <td className={`p-3`}>
              {match.team2} {match.score2 > match.score1 ? "🏆" : ""}
              {match.score2 === 0 ? "✂️" : ""}{" "}
              <RatingChange rating={match.rating2} />
            </td>
            <td className="p-3">
              {match.score1}:{match.score2}
              {match.comment !== "" && (
                <div className="text-xs text-gray-500">{match.comment}</div>
              )}
            </td>
            <td className="p-3">
              <TimeDistance date={new Date(match.createdAt)} />
              <button
                className="group-hover:opacity-100 opacity-0 transition-opacity mx-3 text-red-500"
                onClick={() => {
                  if (
                    window.confirm(
                      `Match ${match.team1} vs ${match.team2} resulting ${match.score1}:${match.score2} will be eradicated from existence - sure about that?`,
                    )
                  ) {
                    deleteMutation.mutate({ id: match.id });
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
