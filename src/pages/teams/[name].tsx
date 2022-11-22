import { NextSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/router";
import { AchievementList, Card, LoadingIndicator } from "~/components/Elements";
import { getTeamMeta } from "~/model/team";
import { EloHistory } from "~/components/Elements/EloHistory";

const Team = () => {
  const teamName = useRouter().query.name as string;
  const { data: team, isLoading } = trpc.teams.byId.useQuery({
    name: teamName,
  });
  const { data: matches } = trpc.matches.list.useQuery({
    team: teamName,
    limit: 0,
  });

  if (!team || isLoading) {
    return (
      <div className="h-32 flex items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  const meta = getTeamMeta(team);

  return (
    <>
      <NextSeo title={team ? team.name : "Team"} />
      <Card>
        <div className="grid grid-cols-6">
          <div className="col-span-6 bg-gray-100 dark:bg-gray-600 flex items-center justify-between rounded-t px-3">
            <h2 className="bg-white px-4 px-2 font-semibold text-2xl my-5 text-gray-800 rounded-lg block">
              {team.name}
            </h2>
            <div>{meta.total.achievementPoints}</div>
          </div>
          <div className="col-span-6 border-b dark:border-gray-600 pb-3">
            <div className="grid grid-cols-3 gap-3 p-3">
              <div>
                <h3 className="font-semibold">{team.rating.toFixed(2)}</h3>
                <p className="text-sm">Current Rating</p>
              </div>
              <div>
                <h3 className="font-semibold">
                  {meta.total.highestRating.toFixed(2)}
                </h3>
                <p className="text-sm">Highest Rating</p>
              </div>
              <div>
                <h3 className="font-semibold">
                  {meta.total.lowestRating.toFixed(2)}
                </h3>
                <p className="text-sm">Lowest Rating</p>
              </div>
              <div className="col-span-3 border-b -m-3 my-2 dark:border-gray-600" />
              <div>
                <h3 className="font-semibold">{meta.total.matches}</h3>
                <p className="text-sm">Matches</p>
              </div>
              <div>
                <h3 className="font-semibold">{meta.total.wins}</h3>
                <p className="text-sm">Wins</p>
              </div>
              <div>
                <h3 className="font-semibold">{meta.total.losses}</h3>
                <p className="text-sm">Losses</p>
              </div>
              <div>
                <h3 className="font-semibold">{meta.total.score}</h3>
                <p className="text-sm">Total score</p>
              </div>
              <div>
                <h3 className="font-semibold">
                  {meta.total.avgScore.toFixed(2)}
                </h3>
                <p className="text-sm">Average score</p>
              </div>
              <div>
                <h3 className="font-semibold">
                  {(meta.total.winRate * 100).toFixed(2)}%
                </h3>
                <p className="text-sm">Winrate</p>
              </div>
              <div className="col-span-3 border-b -mx-3 my-2 dark:border-gray-600" />
              <div>
                <h3 className="font-semibold">{meta.current.winStreak}</h3>
                <p className="text-sm">Current winstreak</p>
              </div>
              <div>
                <h3 className="font-semibold">{meta.total.highestWinStreak}</h3>
                <p className="text-sm">Highest winstreak</p>
              </div>
              <div>
                <h3 className="font-semibold">
                  {meta.total.highestLosingStreak}
                </h3>
                <p className="text-sm">Highest losing streak</p>
              </div>
            </div>
          </div>
          <div className="col-span-6 h-52 border-t border-b dark:border-gray-600">
            <EloHistory matches={matches || []} teams={[team.name]} />
          </div>
          <div className="col-span-6 p-3">
            <AchievementList team={team} />
            {/*<ul>*/}
            {/*  {meta.achievements.map(achievement => (*/}
            {/*    <li key={achievement.id}>{achievement.id}</li>*/}
            {/*  ))}*/}
            {/*</ul>*/}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Team;
