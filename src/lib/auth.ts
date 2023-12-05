import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import prisma from "@/lib/db";

export const authOptions: AuthOptions = {
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: `${token.email}`,
        },
      });
      if (dbUser) {
        token.selectedLeagueId = dbUser.selectedLeagueId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.selectedLeagueId = `${token.selectedLeagueId}`;
        session.user.id = `${token.id}`;
      }
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      let name = user.name;
      if (!user.email) {
        // todo: how can this be?
        return;
      }
      if (!name) {
        name = user.email.split("@")[0];
        await prisma.user.update({
          where: { id: user.id },
          data: { name },
        });
      }
      const league = await prisma.league.create({
        data: {
          name: "Default League",
          owner: {
            connect: { id: user.id },
          },
        },
      });
      await prisma.user.update({
        data: {
          selectedLeague: {
            connect: { id: league.id },
          },
        },
        where: { id: user.id },
      });
      const team = await prisma.team.create({
        data: {
          name: user.name || "Default Team",
          league: {
            connect: { id: league.id },
          },
        },
      });
      const teamMember = await prisma.teamMember.create({
        data: {
          name: user.name || "Default Team Member",
          user: {
            connect: { id: user.id },
          },
          team: {
            connect: { id: team.id },
          },
        },
      });
    },
  },
};
