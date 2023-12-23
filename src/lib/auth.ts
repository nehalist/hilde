import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { leagues, teamMembers, teams, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: AuthOptions = {
  session: {
    strategy: "database",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      // const dbUser = await prisma.user.findUnique({
      //   where: {
      //     email: `${token.email}`,
      //   },
      // });
      // if (dbUser) {
      //   token.selectedLeagueId = dbUser.selectedLeagueId;
      // }
      return token;
    },
    async session({ session, token }) {
      // if (token) {
      //   session.user.selectedLeagueId = `${token.selectedLeagueId}`;
      //   session.user.id = `${token.id}`;
      // }
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      if (!user.email) {
        return; // todo: how can this be?
      }
      let name = user.name;
      if (!name) {
        name = user.email.split("@")[0];
        await db.update(users).set({ name }).where(eq(users.email, user.email));
      }
      const [league] = await db
        .insert(leagues)
        .values({
          name: "Default League",
          ownerId: user.id,
        })
        .returning();

      await db
        .update(users)
        .set({ selectedLeagueId: league.id })
        .where(eq(users.id, user.id));

      const [team] = await db
        .insert(teams)
        .values({
          name: "foobar",
          leagueId: league.id,
        })
        .returning();

      await db
        .insert(teamMembers)
        .values({
          name,
          teamId: team.id,
          userId: user.id,
        });
    },
  },
};
