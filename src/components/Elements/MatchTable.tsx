import { FunctionComponent, useEffect } from "react";
import { Match } from "@prisma/client";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { trpc } from "~/utils/trpc";
import { RatingChange, Score, TimeDistance } from "~/components/Elements";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import dynamic from "next/dynamic";
import { BiCommentDetail } from "react-icons/bi";

const ReactTooltip = dynamic(() => import("react-tooltip"), { ssr: false });

export const MatchTable: FunctionComponent<{
  matches: Match[];
  animated?: boolean;
}> = ({ matches, animated = true }) => {
  const [parent, enable] = useAutoAnimate<HTMLTableSectionElement>();
  useEffect(() => enable(animated), [animated, enable]);
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
    <table className="w-full rounded-lg dark:bg-gray-700">
      <thead className="text-left">
        <tr className="bg-gray-200 dark:bg-gray-600 text-sm">
          <th className="p-3 w-1/4">Team 1</th>
          <th className="p-3 w-1/4">Team 2</th>
          <th className="p-3 w-32">Result</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>
      <tbody ref={parent}>
        {matches.map((match, index) => (
          <tr
            key={match.id}
            className={`${
              index % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
            } group`}
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
            <td className="p-3 flex gap-1 items-center">
              <Score score={match.score1} /> : <Score score={match.score2} />
              {match.comment !== "" && (
                <>
                  <button
                    className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400 transition"
                    data-tip={match.comment}
                    data-for={`comment-${match.id}`}
                  >
                    <BiCommentDetail />
                  </button>
                  <ReactTooltip
                    id={`comment-${match.id}`}
                    globalEventOff="click"
                  />
                </>
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
