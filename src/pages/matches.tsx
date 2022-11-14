import { NextSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { Card, MatchTable } from "~/components/Elements";

const Matches = () => {
  const { data: matches } = trpc.matches.list.useQuery({});

  return (
    <>
      <NextSeo title="Matches" />
      <Card>
        <MatchTable matches={matches || []} />
      </Card>
    </>
  );
};

export default Matches;
