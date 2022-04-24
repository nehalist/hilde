import type { NextPage } from "next";
import Form from "../components/form";
import Layout from "../components/layout";
import { useQuery } from "react-query";
import { Match } from "@prisma/client";
import MatchTable from "../components/match-table";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  const { data } = useQuery<Match[]>(
    ["matches"],
    () => fetch("/api/matches").then(res => res.json()),
    {
      staleTime: 60 * 1000,
    },
  );

  return (
    <Layout>
      <NextSeo title={undefined} />
      <Form />
      <div className="mt-12">{data && <MatchTable matches={data} />}</div>
    </Layout>
  );
};

export default Home;
