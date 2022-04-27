import type { NextPage } from "next";
import Layout from "../components/layout";
import { useQuery } from "react-query";
import Select from "../components/select";
import { useState } from "react";
import { Statistic } from "../model";
import OverallStats from "../components/overall-stats";
import TeamStats from "../components/team-stats";
import { NextSeo } from "next-seo";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const date = new Date();
const years = [date.getFullYear() - 1, date.getFullYear()];

const Stats: NextPage = () => {
  const [teamsize, setTeamsize] = useState(1);
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const { data } = useQuery<Statistic>(
    ["stats", month, year, teamsize],
    async () => {
      const response = await fetch(
        `/api/stats?month=${month}&year=${year}&teamsize=${teamsize}`,
      );
      return await response.json();
    },
    {
      keepPreviousData: true
    }
  );

  return (
    <Layout>
      <NextSeo title="Statistics" />
      <div className="flex gap-3">
        <div>
          <Select
            label={"Month"}
            placeholder={"Month"}
            options={months.map((m, i) => ({ label: m, value: `${i}` }))}
            selectedValue={`${date.getMonth()}`}
            onChange={e => setMonth(parseInt(e.target.value))}
          />
        </div>
        <div>
          <Select
            label={"Year"}
            placeholder={"Year"}
            options={years.map(y => ({ label: `${y}`, value: `${y}` }))}
            selectedValue={`${date.getFullYear()}`}
            onChange={e => setYear(parseInt(e.target.value))}
          />
        </div>
        <div>
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
      </div>
      {data && (
        <>
          <OverallStats stats={data} />
          <h2 className="font-semibold text-2xl my-3 mt-6 text-gray-800">
            Teams
          </h2>
          <TeamStats stats={data} />
        </>
      )}
    </Layout>
  );
};

export default Stats;
