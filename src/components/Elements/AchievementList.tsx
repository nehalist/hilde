import { FunctionComponent } from "react";
import { Team } from "@prisma/client";
import { getTeamMeta } from "~/model/team";
import { Achievement, achievements } from "~/utils/achievements";
import { TimeDistance } from "~/components/Elements/TeamDistance";

const AchievementCard: FunctionComponent<{
  achievement: Achievement;
  earned: Array<{ teamName: string; date: Date; cssClasses: string }>;
  display: "single" | "versus";
}> = ({ achievement, earned, display }) => {
  let bgColor = "";
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

  return (
    <div className="w-full border rounded flex items-center dark:border-gray-500">
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
        <small className="text-gray-500">
          {display === "single" ? (
            <>
              ✅ <TimeDistance date={new Date(earned[0].date)} />
            </>
          ) : (
            <>
              {earned.map(e => (
                <>
                  <span
                    key={e.teamName}
                    className={`p-1 text-gray-800 rounded-lg bg-gray-200 mr-1 ${e.cssClasses}`}
                  >
                    {e.teamName}
                  </span>
                </>
              ))}
            </>
          )}
        </small>
      </div>
    </div>
  );
};

export const AchievementList: FunctionComponent<{
  team: Team;
  versus?: Team;
}> = ({ team, versus }) => {
  const meta = getTeamMeta(team);
  const teamAchievements = achievements.filter(achievement =>
    meta.achievements.find(a => a.id === achievement.id),
  );
  const versusMeta = versus ? getTeamMeta(versus) : undefined;
  const versusAchievements = versusMeta
    ? achievements.filter(achievement =>
        versusMeta.achievements.find(a => a.id === achievement.id),
      )
    : [];

  return (
    <div className="grid grid-cols-2 gap-3">
      {[...teamAchievements, ...versusAchievements].map(achievement => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          earned={[
            ...teamAchievements
              .filter(a => a.id === achievement.id)
              .map(() => ({
                teamName: team.name,
                date: meta.achievements.find(a => a.id === achievement.id)!
                  .earnedAt,
                cssClasses: "bg-lime-600 text-white",
              })),
            ...versusAchievements
              .filter(a => a.id === achievement.id)
              .map(() => ({
                teamName: versus!.name,
                date: versusMeta!.achievements.find(
                  a => a.id === achievement.id,
                )!.earnedAt,
                cssClasses: "bg-cyan-600 text-white",
              })),
          ]}
          display={versus ? "versus" : "single"}
        />
      ))}
    </div>
  );
};
