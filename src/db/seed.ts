import { faker, simpleFaker } from "@faker-js/faker";
import { db } from "@/db";
import { League, leagues, memberships, NewTeam, teams, User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

type TeamsSeedProps = {
  count: number | undefined,
  owner: User,
  league: League,
};

async function seedUser(): Promise<User> {
  const email = faker.internet.email().toLowerCase();
  const name = email.split("@")[0];

  const [user] = await db.insert(users).values({
    id: simpleFaker.string.uuid(),
    name,
    email,
    emailVerified: new Date(),
  }).onConflictDoNothing().returning();

  return user;
}

async function seedLeague({ user, role, setSelectedLeague }: { user: User; role: "admin" | "member"; setSelectedLeague: boolean }): Promise<League> {
  const [league] = await db.insert(leagues).values({
    name: faker.company.name(),
    ownerId: user.id,
  }).onConflictDoNothing().returning();

  await db
    .insert(memberships)
    .values({
      leagueId: league.id,
      userId: user.id,
      role,
    });

  if (setSelectedLeague) {
    await db.update(users).set({
      selectedLeagueId: league.id,
    }).where(eq(users.id, user.id))
  }

  return league;
}

function generateTeam({ owner, league, teamSize }: { owner: User, league: League, teamSize: number }): NewTeam {
  let names: string[] = [];

  for (let i = 0; i < teamSize; i++) {
    names.push(faker.person.firstName().toLowerCase().substring(0, 2));
  }

  return {
    name: names.join(","),
    teamSize,
    leagueId: league.id,
    userId: owner.id,
  };
}

function generateTeams({ owner, league, count }: TeamsSeedProps): NewTeam[] {
  return [...Array(count).keys()].map((i) => {
    console.log(`Generate team ${i + 1}...`);

    return generateTeam({
      owner,
      league,
      teamSize: faker.number.int({
        min: 1,
        max: 3,
      }),
    });
  });
}

async function seedTeams({ owner, league, count }: TeamsSeedProps) {
  const newTeams = generateTeams({
    owner,
    league,
    count,
  });
  await db.insert(teams).values(newTeams).onConflictDoNothing();
}

async function clear() {
  await db.delete(teams);
  await db.delete(memberships);
  await db.delete(leagues);
  await db.delete(users);
}

async function seed() {
  const teamCount = 20;
  const user = await seedUser();
  const league = await seedLeague({ user, role: "admin", setSelectedLeague: true });
  await seedTeams({ owner: user, league, count: teamCount });
}

clear().then(seed).finally(() => {
  console.log("done seeding.");
  process.exit(0);
});
