import { FunctionComponent } from "react";
import { Team } from "@prisma/client";
import { getTeamMeta } from "~/model/team";
import { Achievement, achievements } from "~/utils/achievements";
import { TimeDistance } from "~/components/Elements/TeamDistance";

const AchievementCard: FunctionComponent<{
  achievement: Achievement;
  earnedAt: Date;
}> = ({ achievement, earnedAt }) => {
  return (
    <div className="w-full border rounded flex items-center p-3 gap-3">
      <div className="p-3 text-lg">
        <span className="rounded-full font-semibold p-2 border-2">{achievement.points}</span>
      </div>
      <div>
        <h2 className="font-bold">{achievement.title}</h2>
        <div>{achievement.description}</div>
        <small className="text-gray-500">
          <TimeDistance date={new Date(earnedAt)} />
        </small>
      </div>
    </div>
  );
};

export const AchievementList: FunctionComponent<{ team: Team }> = ({
  team,
}) => {
  const meta = getTeamMeta(team);
  const teamAchievements = achievements.filter(achievement =>
    meta.achievements.find(a => a.id === achievement.id),
  );

  return (
    <div className="grid grid-cols-2 gap-3">
      {teamAchievements.map(achievement => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement}
          earnedAt={
            meta.achievements.find(a => a.id === achievement.id)!.earnedAt
          }
        />
      ))}
    </div>
  );
};
