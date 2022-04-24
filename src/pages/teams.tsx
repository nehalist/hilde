import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layout";
import prisma from "../lib/prisma";
import { Team } from "@prisma/client";
import { Card } from "../components/card";
import TeamTable from '../components/team-table';

interface TeamProps {
  teams: Team[];
}

const Teams: NextPage<TeamProps> = ({ teams }) => {
  return (
    <Layout>
      <Card>
        <TeamTable teams={teams} />
      </Card>
    </Layout>
  );
};

export default Teams;

export const getServerSideProps: GetServerSideProps<TeamProps> = async () => {
  const teams = await prisma.team.findMany({
    take: 1000,
    orderBy: {
      rating: "desc",
    },
  });

  return {
    props: {
      teams,
    },
  };
};
