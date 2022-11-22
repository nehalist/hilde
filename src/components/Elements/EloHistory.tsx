import type { FunctionComponent } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { Match } from "@prisma/client";

export const EloHistory: FunctionComponent<{
  matches: Match[];
  teams: string[];
}> = ({ teams, matches }) => {
  const data: Serie[] = teams.map(t => ({
    id: t,
    data: [],
  }));

  matches
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
    .forEach((match, index) => {
      teams.forEach(team => {
        data
          .find(serie => serie.id === team)!
          .data.push({
            x: index,
            y: match.team1 === team ? match.team1Rating : match.team2Rating,
          });
      });
    });

  console.log(data);

  return (
    <div className="h-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 0, right: 5, bottom: 0, left: 50 }}
        yScale={{
          type: "linear",
          min: "auto",
        }}
        tooltip={({ point }) => {
          return (
            <div className="bg-gray-200 p-2 text-sm shadow rounded">
              <b>{point.serieId}</b>: {(point.data.y as number).toFixed(2)}
            </div>
          );
        }}
        curve="linear"
        axisTop={null}
        axisRight={null}
        enablePoints={false}
        axisBottom={null}
        useMesh={true}
      />
    </div>
  );
};
