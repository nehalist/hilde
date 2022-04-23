import type { NextPage } from "next";
import Form from "../components/form";
import Layout from "../components/layout";
import { useQuery } from "react-query";
import { Match } from "@prisma/client";
import MatchTable from "../components/match-table";

const Home: NextPage = () => {
  const { data } = useQuery<Match[]>(
    ["matches"],
    () => fetch("/api/matches").then(res => res.json()),
    {
      staleTime: 1000 * 60 * 60,
    },
  );

  return (
    <Layout>
      <Form />
      {data && <MatchTable matches={data} />}
    </Layout>
  );
};

export default Home;
