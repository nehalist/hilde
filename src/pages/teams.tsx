import { useState } from "react";
import { NextSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { Select } from "~/components/Form";
import { Card, LoadingIndicator, TeamTable } from "~/components/Elements";

const Teams = () => {
  const [teamsize, setTeamsize] = useState(1);
  const { data, isLoading } = trpc.teams.list.useQuery({ teamsize });

  return (
    <>
      <NextSeo title="Teams" />
      <div className="my-2">
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
