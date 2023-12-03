import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import prisma from "@/lib/db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
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
