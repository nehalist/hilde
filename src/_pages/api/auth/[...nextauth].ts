import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "~/server/prisma";
import EmailProvider from "next-auth/providers/email";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (credentials?.password === process.env.ADMIN_PASSWORD) {
    //       return { id: "1", name: "admin" };
    //     }
    //     return null;
    //   },
    // }),
  ],
};
export default NextAuth(authOptions);
