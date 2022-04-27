import type { NextPage } from "next";
import Layout from "../components/layout";
import { Card } from "../components/card";
import TeamTable from "../components/team-table";
import { useQuery } from "react-query";
import LoadingIndicator from "../components/loading-indicator";
import Select from "../components/select";
import { useState } from "react";
import { NextSeo } from "next-seo";

const Teams: NextPage = () => {
  const [teamsize, setTeamsize] = useState(1);
  const { data, isLoading } = useQuery(["teams", teamsize], () =>
    fetch(`/api/teams?teamsize=${teamsize}`).then(res => res.json()),
    { keepPreviousData: true }
  );

  return (
    <Layout>
      <NextSeo title="Teams" />
      <div className="mb-3">
        <Select
          label={"Team Size"}
          placeholder={"Single"}
          options={[
            { label: "Single", value: "1" },
            { label: "Double", value: "2" },
          ]}
          selectedValue={`${teamsize}`}
          onChange={e => setTeamsize(parseInt(e.target.value))}
        />
      </div>
      <Card>
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingIndicator />
          </div>
        ) : (
          <TeamTable teams={data} />
        )}
      </Card>
    </Layout>
  );
};

export default Teams;
