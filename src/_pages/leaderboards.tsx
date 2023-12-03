import { NextSeo } from "next-seo";
import { LeaderboardsTable, LoadingIndicator } from "~/components/Elements";
import { trpc } from "~/utils/trpc";
import { useStore } from "~/utils/store";

const Leaderboards = () => {
  const selectedSeason = useStore(state => +state.season);
  const { data, isLoading } = trpc.leaderboards.forSeason.useQuery({
    season: selectedSeason,
  });

  return (
    <>
      <NextSeo title="Leaderboards" />
      {isLoading || !data ? (
        <div className="h-32 flex items-center justify-center">
          <LoadingIndicator />
        </div>
      ) : (
        <LeaderboardsTable leaderboards={data} />
      )}
    </>
  );
};

export default Leaderboards;
