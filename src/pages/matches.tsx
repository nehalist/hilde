import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout";
import prisma from "../lib/prisma";
import { Match } from "@prisma/client";
import MatchTable from "../components/match-table";
import { Card } from "../components/card";

interface MatchesProps {
  matches: Match[];
}

const Matches: NextPage<MatchesProps> = ({ matches }) => {
  return (
    <Layout>
      <Card>
        <MatchTable matches={matches} />
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
