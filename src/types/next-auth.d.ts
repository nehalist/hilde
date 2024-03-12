import { userRolesEnum } from "@/db/schema";
import { DefaultSession } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

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
