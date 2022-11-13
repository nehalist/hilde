import Layout from "~/components/layout";
import MatchTable from "~/components/match-table";
import { Card } from "~/components/card";
import { NextSeo } from "next-seo";
import { trpc } from "~/utils/trpc";

const Matches = () => {
  const { data: matches } = trpc.matches.list.useQuery({});

  return (
    <Layout>
      <NextSeo title="Matches" />
      <Card>
        <MatchTable matches={matches || []} />
      </Card>
    </Layout>
  );
};

export default Matches;
