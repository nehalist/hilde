import { useState } from "react";
import { NextSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { Select } from "~/components/Form";
import { Card, LoadingIndicator, TeamTable } from "~/components/Elements";

const Teams = () => {
  const [teamsize, setTeamsize] = useState(1);
  const { data, isLoading } = trpc.teams.list.useQuery(
    { teamsize },
    { keepPreviousData: true },
  );

  return (
    <>
      <NextSeo title="Teams" />
      <div className="my-2">
        <Select
          label={"Team Size"}
          placeholder={"Single"}
          options={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
          ]}
          selectedValue={`${teamsize}`}
          onChange={e => setTeamsize(parseInt(e.target.value))}
        />
      </div>
      <Card>
        {isLoading || !data ? (
          <div className="flex justify-center">
            <LoadingIndicator />
          </div>
        ) : (
          <TeamTable teams={data} />
        )}
      </Card>
    </>
  );
};

export default Teams;
