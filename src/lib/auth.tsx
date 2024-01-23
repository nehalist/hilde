import { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import VerificationRequest from "../../emails/verification-request";
import { createLeague } from "@/db/model/league";
import { customGameId } from "@/lib/games";
import { RatingSystem } from "@/lib/rating";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider, theme }) => {
        const transport = createTransport(provider.server);
        const html = render(<VerificationRequest url={url} />);
        const { host } = new URL(url);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          html,
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/login",
  // },
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
      const league = await createLeague(
        dbUser,
        `${name}'s League`,
        customGameId,
        0,
        true,
        RatingSystem.Elo,
        1000,
        { k: 32 },
      );

      await db
        .update(users)
        .set({ selectedLeagueId: league.id })
        .where(eq(users.id, user.id));
    },
  },
};
