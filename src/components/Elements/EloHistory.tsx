import type { FunctionComponent } from "react";
import { useMemo } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { Match } from "@prisma/client";
import { useTheme } from "next-themes";

export const EloHistory: FunctionComponent<{
  matches: Match[];
  teams: string[];
}> = ({ teams, matches }) => {
  const data: Serie[] = useMemo(
    () =>
      teams.map(t => ({
        id: t,
        data: matches
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
          .map(m => ({
            x: m.id,
            y: m.team1 === t ? m.team1Rating : m.team2Rating,
          })),
      })),
    [teams, matches],
  );
  const { theme } = useTheme();

  return (
    <div className="h-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 1, right: 5, bottom: 1, left: 50 }}
        yScale={{
          type: "linear",
          min: "auto",
        }}
        tooltip={({ point }) => {
          return (
            <div className="bg-gray-200 dark:bg-gray-800 p-2 text-sm shadow rounded">
              <b>{point.serieId}</b>: {(point.data.y as number).toFixed(2)}
            </div>
          );
        }}
        // TODO: animating charts leads to a bug where the line becomes buggy when versus is set
        animate={false}
        colors={["#65a30d", "#0891b2"]} // equals lime-600 and cyan-600
        theme={
          theme === "dark"
            ? {
                axis: {
                  ticks: {
                    text: {
                      fill: "#9ca3af",
                    },
                  },
                },
                grid: {
                  line: {
                    stroke: "#4b5563",
                    strokeWidth: 1,
                  },
                },
              }
            : {}
        }
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        enablePoints={false}
        axisBottom={null}
        useMesh={true}
      />
    </div>
  );
};
