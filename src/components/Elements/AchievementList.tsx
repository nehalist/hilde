import { Fragment, FunctionComponent } from "react";
import { Achievement, achievements } from "~/utils/achievements";
import { TimeDistance } from "~/components/Elements/TeamDistance";
import { TeamWithMetaAndAchievements } from "~/server/model/team";
import { TiDeleteOutline } from "react-icons/ti";
import { trpc } from "~/utils/trpc";
import { toast } from "react-toastify";
import { useStore } from "~/utils/store";

const AchievementCard: FunctionComponent<{
  achievement: Achievement;
  earned: Array<{
    teamName: string;
    date: Date;
    cssClasses: string;
    id?: number;
  }>;
  display: "single" | "versus";
}> = ({ achievement, earned, display }) => {
  let bgColor;
  switch (true) {
    case achievement.points > 25:
      bgColor = "bg-gradient-to-b from-yellow-500 to-amber-600";
      break;
    case achievement.points > 10:
      bgColor = "bg-gradient-to-b from-gray-400 to-gray-500";
      break;
    default:
      bgColor = "bg-gradient-to-b from-amber-700 to-amber-800";
  }
  const utils = trpc.useContext();
  const deleteMutation = trpc.teams.deleteAchievement.useMutation({
    onSuccess: async () => {
      await utils.teams.invalidate();
      toast("Its gone. Forever.", {
        type: "success",
      });
    },
  });

  return (
    <div className="w-full border rounded flex items-center dark:border-gray-500 group">
      <div className={`p-3 text-lg h-full text-white flex items-center`}>
        <div>
          <span
            className={`rounded-full font-semibold p-2 ${bgColor} shadow-xl`}
          >
            {achievement.points}
          </span>
        </div>
      </div>
      <div className={`p-2 w-full`}>
        <h2 className="font-bold">{achievement.title}</h2>
        <div>{achievement.description}</div>
        <small className="text-gray-500 flex gap-1">
          {display === "single" ? (
            <>
              ✅ <TimeDistance date={new Date(earned[0].date)} />
              <button
                className="group-hover:opacity-100 opacity-0 transition-opacity ml-2 text-lg text-red-500"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete the achievement "${achievement.title}" from ${earned[0].teamName}?`,
                    ) &&
                    earned[0].id
                  ) {
                    deleteMutation.mutate({ id: earned[0].id });
                  }
                }}
              >
                <TiDeleteOutline />
              </button>
            </>
          ) : (
            <>
              {earned.map(e => (
                <Fragment key={`${e.teamName}-${e.date}`}>
                  <span
                    className={`p-1 text-gray-800 rounded-lg bg-gray-200 mr-1 ${e.cssClasses}`}
                  >
                    {e.teamName}
                  </span>
                </Fragment>
              ))}
            </>
          )}
        </small>
      </div>
    </div>
  );
};

export const AchievementList: FunctionComponent<{
  team: TeamWithMetaAndAchievements;
  versus?: TeamWithMetaAndAchievements;
}> = ({ team, versus }) => {
  const selectedSeason = useStore(state => state.season);
  const teamAchievements = achievements.filter(achievement =>
    team.achievements.find(
      a => a.achievement === achievement.id && a.season === selectedSeason,
    ),
  );
  const versusAchievements = versus
    ? achievements.filter(achievement =>
        versus.achievements.find(
          a => a.achievement === achievement.id && a.season === selectedSeason,
        ),
      )
    : [];

  const uniqueAchievements = [
    ...new Set([...teamAchievements, ...versusAchievements]),
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {uniqueAchievements.map(achievement => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          earned={[
            ...teamAchievements
              .filter(a => a.id === achievement.id)
              .map(() => {
                const teamAchievement = team.achievements.find(
                  a => a.achievement === achievement.id,
                )!;
                return {
                  id: teamAchievement.id,
                  teamName: team.name,
                  date: teamAchievement.createdAt,
                  cssClasses: "bg-lime-600 text-white",
                };
              }),
            ...versusAchievements
              .filter(a => a.id === achievement.id)
              .map(() => ({
                teamName: versus!.name,
                date: versus!.achievements.find(
                  a => a.achievement === achievement.id,
                )!.createdAt,
                cssClasses: "bg-cyan-600 text-white",
              })),
          ]}
          display={versus ? "versus" : "single"}
        />
      ))}
    </div>
  );
};
