import { JWT as NextAuthJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      selectedLeagueId?: string;
      firstName: string;
      lastName: string;
      prefix: string;
      suffix: string;
    } & DefaultSession["user"];
  }

  interface JWT extends NextAuthJWT {
    token: {
      firstName: string;
      lastName: string;
      prefix: string;
      suffix: string;
      selectedLeagueId?: string;
    };
  }
}
