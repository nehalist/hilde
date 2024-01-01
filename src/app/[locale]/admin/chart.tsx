"use client";

import { ResponsiveLine } from "@nivo/line";
import { getDashboardData } from "@/app/[locale]/admin/page";
import { format } from "date-fns";

export function AdminDashboardChart({
  data,
}: {
  data: Awaited<ReturnType<typeof getDashboardData>>;
}) {
  const chartData = [
    {
      id: "users",
      color: "hsl(299, 70%, 50%)",
      data: data.userCourse.map(item => ({
        x: item.date,
        y: item.count,
      })),
    },
  ];

  return (
    <div className="w-full h-96">
      <ResponsiveLine
        data={chartData}
        enableArea={true}
        curve="basis"
        enableGridY={false}
        enablePoints={false}
        xScale={{ type: "point" }}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        axisBottom={{
          format: value => {
            if (
              value === data.userCourse[0].date ||
              value === data.userCourse[data.userCourse.length - 1].date
            ) {
              return format(new Date(value), "MMM d");
            }
            return "";
          },
        }}
        axisLeft={{
          tickSize: 1,
          tickPadding: 5,
          tickRotation: 0,
          format: e => {
            return e % 1 === 0 ? Math.floor(e) : "";
          },
          legendOffset: -40,
          legendPosition: "middle",
        }}
        legends={[]}
      />
    </div>
  );
}
