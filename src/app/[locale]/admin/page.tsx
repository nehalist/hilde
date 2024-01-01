import { getCurrentUser } from "@/lib/session";
import { redirect } from "@/lib/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { count, gt, sql } from "drizzle-orm";
import { eachDayOfInterval, isEqual } from "date-fns";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { AdminDashboardChart } from "@/app/[locale]/admin/chart";

export async function getDashboardData() {
  const recentUsers = await db
    .select({
      createdAt: sql<string>`date_trunc
      ('day',
      ${users.createdAt}
      )`,
      count: sql<number>`cast(count(
      ${users.id}
      )
      as
      int
      )`,
    })
    .from(users)
    .where(
      gt(
        users.createdAt,
        sql`NOW
        () - INTERVAL '30 days'`,
      ),
    )
    .groupBy(
      sql`date_trunc
      ('day',
      ${users.createdAt}
      )`,
    );
  const [totalUsers] = await db.select({ count: count() }).from(users);

  const course = eachDayOfInterval({
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date(),
  })
    .reverse()
    .reduce<{
      days: Array<{ date: string; count: number }>;
      remaining: number;
    }>(
      (acc, day) => {
        const countOnDay =
          recentUsers.find(u => isEqual(new Date(u.createdAt), day))?.count ||
          0;

        return {
          days: [
            ...acc.days,
            {
              date: day.toISOString(),
              count: acc.remaining - countOnDay,
            },
          ],
          remaining: acc.remaining - countOnDay,
        };
      },
      { days: [], remaining: totalUsers.count },
    );

  return {
    userCourse: course.days.reverse(),
  };
}

export default async function Admin() {
  const user = await getCurrentUser();
  if (user?.role !== "admin") {
    return redirect("/");
  }
  const data = await getDashboardData();

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardBody>
          <AdminDashboardChart data={data} />
        </CardBody>
      </Card>
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardHeader>Total users</CardHeader>
          <CardBody>...</CardBody>
        </Card>
        <Card>
          <CardHeader>Total teams</CardHeader>
          <CardBody>...</CardBody>
        </Card>
        <Card>
          <CardHeader>Total matches</CardHeader>
          <CardBody>...</CardBody>
        </Card>
      </div>
    </div>
  );
}
