import { getCurrentUser } from "@/lib/session";
import { redirect } from "@/lib/navigation";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { db } from "@/db";
import { leagues, matches, memberships, teams, users } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

async function getStats() {
  return {
    leagues: {
      active: await db
        .select({ count: sql<number>`count(*)::int` })
        .from(leagues)
        .where(eq(leagues.status, "active")),
      finished: await db
        .select({ count: sql<number>`count(*)::int` })
        .from(leagues)
        .where(eq(leagues.status, "finished")),
    },
    memberships: await db
      .select({ count: sql<number>`count(*)::int` })
      .from(memberships),
    users: await db.select({ count: sql<number>`count(*)::int` }).from(users),
    teams: await db.select({ count: sql<number>`count(*)::int` }).from(teams),
    matches: await db
      .select({ count: sql<number>`count(*)::int` })
      .from(matches),
  };
}

export default async function Admin() {
  const user = await getCurrentUser();
  if (user?.role !== "admin") {
    return redirect("/");
  }
  const stats = await getStats();

  return (
    <div>
      <p>It&apos;s a very poor admin, but it&apos;s a start.</p>
      <div className="grid grid-cols-3 gap-3 mt-3">
        <Card>
          <CardHeader>Total users</CardHeader>
          <CardBody>{stats.users[0].count}</CardBody>
        </Card>
        <Card>
          <CardHeader>Total teams</CardHeader>
          <CardBody>{stats.teams[0].count}</CardBody>
        </Card>
        <Card>
          <CardHeader>Total memberships</CardHeader>
          <CardBody>{stats.memberships[0].count}</CardBody>
        </Card>
        <Card>
          <CardHeader>Total leagues</CardHeader>
          <CardBody>
            {stats.leagues.active[0].count} active,{" "}
            {stats.leagues.finished[0].count} finished
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Total matches</CardHeader>
          <CardBody>{stats.matches[0].count}</CardBody>
        </Card>
      </div>
    </div>
  );
}
