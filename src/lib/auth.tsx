import { db } from "@/db";
import { createLeague } from "@/db/model/league";
import { users } from "@/db/schema";
import { customGameId } from "@/lib/games";
import {
  getDefaultRatingSystemParameters,
  RatingSystem,
  ratingSystems,
} from "@/lib/rating";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db) as any,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: "id",
      clientSecret: "secret",
    }),
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
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, `${user.email}`),
      });
      if (!dbUser) {
        return;
      }
      const eloRating = ratingSystems.find(r => r.id === RatingSystem.Elo)!;
      const league = await createLeague(
        dbUser,
        `${name}'s League`,
        customGameId,
        eloRating.id,
        1000,
        getDefaultRatingSystemParameters(eloRating.id),
      );

      await db
        .update(users)
        .set({ selectedLeagueId: league.id })
        .where(eq(users.id, user.id));
    },
  },
};
