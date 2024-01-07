import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { leagues, teamMembers, teams, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
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
      if (!token.email) {
        return token;
      }
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, token.email));
      if (user) {
        token.name = user.name;
        token.selectedLeagueId = user.selectedLeagueId;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
      }
      return token;
    },
    async session({ session }) {
      if (!session.user || !session.user.email) {
        return session;
      }
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, session.user.email));
      if (user) {
        session.user.selectedLeagueId = `${user.selectedLeagueId}`;
        session.user.role = `${user.role}`;
      }
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

      await db.insert(teamMembers).values({
        name,
        teamId: team.id,
        userId: user.id,
      });
    },
  },
};
