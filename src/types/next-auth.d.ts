import { JWT as NextAuthJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { userRolesEnum } from "@/db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      selectedLeagueId?: string;
      firstName: string;
      lastName: string;
      role: typeof userRolesEnum.enumValues[number];
    } & DefaultSession["user"];
  }

  interface JWT extends NextAuthJWT {
    token: {
      firstName: string;
      lastName: string;
      selectedLeagueId?: string;
      role: boolean;
    };
  }
}
