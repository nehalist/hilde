import Form from "../components/form";
import Layout from "../components/layout";
import MatchTable from "../components/match-table";
import { NextSeo } from "next-seo";
import { trpc } from "~/utils/trpc";

const Home = () => {
  const matches = trpc.matches.list.useQuery({ limit: 5 });

  return (
    <Layout>
      <NextSeo title={undefined} />
      <Form />
      <div className="mt-12">
        <div className="text-center">
          <h3 className="text-gray-400 uppercase text-sm my-2">
            Recent Matches
          </h3>
        </div>
        {matches.data && <MatchTable matches={matches.data} />}
      </div>
    </Layout>
  );
};

export default Home;
