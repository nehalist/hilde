import type { NextPage } from "next";
import Layout from "../components/layout";
import { useQuery } from "react-query";
import Select from "../components/select";
import { useState } from "react";
import { Statistic } from "../model";
import OverallStats from '../components/overall-stats';
import TeamStats from '../components/team-stats';

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
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const { data } = useQuery<Statistic>(["stats", month, year], async () => {
    const response = await fetch(`/api/stats?month=${month}&year=${year}`);
    return await response.json();
  });

  return (
    <Layout>
      <div>
        <Select
          label={"Month"}
          placeholder={"Month"}
          options={months.map((m, i) => ({ label: m, value: `${i}` }))}
          selectedValue={`${date.getMonth()}`}
          onChange={e => setMonth(parseInt(e.target.value))}
        />
        <Select
          label={"Year"}
          placeholder={"Year"}
          options={years.map(y => ({ label: `${y}`, value: `${y}` }))}
          selectedValue={`${date.getFullYear()}`}
          onChange={e => setYear(parseInt(e.target.value))}
        />
      </div>
      {data && (
        <>
          <h2 className="font-semibold text-2xl my-3 text-gray-800">Overall</h2>
          <OverallStats stats={data} />
          <h2 className="font-semibold text-2xl my-3 mt-6 text-gray-800">Teams</h2>
          <TeamStats stats={data} />
        </>
      )}
    </Layout>
  );
};

export default Stats;