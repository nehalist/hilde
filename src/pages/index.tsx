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
      {matches.data && matches.data.length > 0 && (
        <div className="mt-12">
          <div className="text-center">
            <h3 className="text-gray-400 uppercase text-sm my-2">
              Recent Matches
            </h3>
          </div>
          <MatchTable matches={matches.data} />
        </div>
      )}
    </>
  );
};

export default Home;
