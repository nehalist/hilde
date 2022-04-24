import type { NextPage } from "next";
import Form from "../components/form";
import Layout from "../components/layout";
import { useQuery, useQueryClient } from "react-query";
import { Match } from "@prisma/client";
import MatchTable from "../components/match-table";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<Match[]>(
    ["matches"],
    () => fetch("/api/matches").then(res => res.json()),
  );

  return (
    <Layout>
      <Form />
      <div className="mt-12">
        {data && (
          <MatchTable
            matches={data}
            onDelete={match => {
              const existing = queryClient.getQueryData<Match[]>(["matches"]);
              queryClient.setQueryData(
                ["matches"],
                existing?.filter(m => m.id !== match.id),
              );
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default Home;
