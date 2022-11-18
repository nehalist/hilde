import { NextSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { MatchTable } from "~/components/Elements";
import { MatchCreationForm } from "~/components/Form";

const Home = () => {
  const matches = trpc.matches.list.useQuery({ limit: 5 });

  return (
    <>
      <NextSeo title={undefined} />
      <MatchCreationForm />
      <div className="mt-12">
        <div className="text-center">
          <h3 className="text-gray-400 uppercase text-sm my-2">
            Recent Matches
          </h3>
        </div>
        {matches.data && <MatchTable matches={matches.data || []} />}
      </div>
    </>
  );
};

export default Home;
