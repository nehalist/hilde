import { JWT as NextAuthJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { userRolesEnum } from "@/db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      selectedLeagueId?: string;
      role: (typeof userRolesEnum.enumValues)[number];
    } & DefaultSession["user"];
  }

  interface JWT extends NextAuthJWT {
    token: {
      selectedLeagueId?: string;
      role: boolean;
    };
  }
}
