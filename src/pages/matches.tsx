import { NextSeo } from "next-seo";
import { trpc } from "~/utils/trpc";
import { Card, MatchTable } from "~/components/Elements";
import { useState } from "react";
import { Select } from "~/components/Form";

const Matches = () => {
  const [team1Filter, setTeam1Filter] = useState<string>("");
  const [team2Filter, setTeam2Filter] = useState<string>("");
  const [exact, setExact] = useState(true);

  const {
    data: matches,
    hasNextPage,
    fetchNextPage,
  } = trpc.matches.infiniteList.useInfiniteQuery(
    {
      limit: 25,
      team1: team1Filter,
      team2: team2Filter,
      exact,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
      keepPreviousData: true,
    },
  );
  const { data: teams } = trpc.teams.list.useQuery({});

  return (
    <>
      <NextSeo title="Matches" />
      <div className="my-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <Select
              label="Team 1"
              options={[
                { label: "All", value: "" },
                ...(teams || [])
                  .map(t => ({ label: t.name, value: t.name }))
                  .filter(t => t.value !== team2Filter),
              ]}
              selectedValue={team1Filter}
              onChange={e => setTeam1Filter(e.target.value)}
            />
          </div>
          {team1Filter !== "" && (
            <div>
              <Select
                label="Team 2"
                options={[
                  { label: "All", value: "" },
                  ...(teams || [])
                    .map(t => ({ label: t.name, value: t.name }))
                    .filter(t => t.value !== team1Filter),
                ]}
                selectedValue={team2Filter}
                onChange={e => setTeam2Filter(e.target.value)}
              />
            </div>
          )}
          {team1Filter && (
            <label
              htmlFor="exact-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={exact}
                id="exact-toggle"
                className="sr-only peer"
                onChange={() => setExact(!exact)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-lime-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Exact
              </span>
            </label>
          )}
        </div>
      </div>
      <Card>
        <MatchTable
          matches={
            matches?.pages
              ?.flat()
              .map(i => i.items)
              .flat() || []
          }
          animated={false}
        />
        {hasNextPage && (
          <button onClick={() => fetchNextPage()}>Load more</button>
        )}
      </Card>
    </>
  );
};

export default Matches;
