import { FunctionComponent, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { trpc } from "~/utils/trpc";
import { RatingChange, Score, TimeDistance } from "~/components/Elements";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import dynamic from "next/dynamic";
import { BiCommentDetail } from "react-icons/bi";
import { TeamLink } from "~/components/Elements/TeamLink";
import { MatchWithAchievements } from "~/server/model/match";
import { achievements } from "~/utils/achievements";

const ReactTooltip = dynamic(() => import("react-tooltip") as any, { ssr: false });

export const MatchTable: FunctionComponent<{
  matches: MatchWithAchievements[];
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
              <TeamLink team={match.team1} />{" "}
              {match.score1 > match.score2 ? "🏆" : ""}
              {match.achievements.filter(a => a.teamName === match.team1)
                .length > 0 && (
                <>
                  <span
                    data-tip={achievements
                      .filter(a =>
                        match.achievements
                          .filter(a => a.teamName === match.team1)
                          .find(ac => a.id === ac.achievement),
                      )
                      .map(a => a.title)
                      .join(", ")}
                    data-for={`match-achievements-team1-${match.id}`}
                  >
                    🏅
                  </span>
                  {/*<ReactTooltip*/}
                  {/*  id={`match-achievements-team1-${match.id}`}*/}
                  {/*  globalEventOff="click"*/}
                  {/*/>*/}
                </>
              )}{" "}
              {match.score1 === 0 ? "✂️" : ""}{" "}
              <RatingChange rating={match.team1RatingChange} />
            </td>
            <td className={`p-3`}>
              <TeamLink team={match.team2} />{" "}
              {match.score2 > match.score1 ? "🏆" : ""}{" "}
              {match.achievements.filter(a => a.teamName === match.team2)
                .length > 0 && (
                <>
                  <span
                    data-tip={achievements
                      .filter(a =>
                        match.achievements
                          .filter(a => a.teamName === match.team2)
                          .find(ac => a.id === ac.achievement),
                      )
                      .map(a => a.title)
                      .join(", ")}
                    data-for={`match-achievements-team2-${match.id}`}
                  >
                    🏅
                  </span>
                  {/*<ReactTooltip*/}
                  {/*  id={`match-achievements-team2-${match.id}`}*/}
                  {/*  globalEventOff="click"*/}
                  {/*/>*/}
                </>
              )}{" "}
              {match.score2 === 0 ? "✂️" : ""}{" "}
              <RatingChange rating={match.team2RatingChange} />
            </td>
            <td className="p-3 flex gap-1 items-center">
              <Score score={match.score1} /> : <Score score={match.score2} />
              {match.comment !== "" && (
                <>
                  <button
                    className="opacity-75 hover:opacity-100 transition"
                    data-tip={match.comment}
                    data-for={`comment-${match.id}`}
                  >
                    <BiCommentDetail />
                  </button>
                  {/*<ReactTooltip*/}
                  {/*  id={`comment-${match.id}`}*/}
                  {/*  globalEventOff="click"*/}
                  {/*/>*/}
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
