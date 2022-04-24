import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout";
import prisma from "../lib/prisma";
import { Match } from "@prisma/client";
import MatchTable from "../components/match-table";
import { Card } from "../components/card";
import { useMemo, useState } from "react";
import { NextSeo } from "next-seo";

interface MatchesProps {
  matches: Match[];
}

const Matches: NextPage<MatchesProps> = ({ matches }) => {
  const [deleted, setDeleted] = useState<number[]>([]);
  const filteredMatches = useMemo(() => {
    return matches.filter(match => !deleted.includes(match.id));
  }, [matches, deleted]);

  return (
    <Layout>
      <NextSeo title="Matches" />
      <Card>
        <MatchTable
          matches={filteredMatches}
          onDelete={match => setDeleted([...deleted, match.id])}
        />
      </Card>
    </Layout>
  );
};

export default Matches;

export const getServerSideProps: GetServerSideProps<
  MatchesProps
> = async () => {
  const matches = await prisma.match.findMany({
    take: 1000,
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      matches: matches,
    },
  };
};
