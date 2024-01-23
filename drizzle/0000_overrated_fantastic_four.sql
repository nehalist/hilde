DO $$ BEGIN
 CREATE TYPE "game" AS ENUM('custom', 'foosball', 'badminton', 'chess', 'pool', 'table-tennis', 'sixty-six');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "leagueStatus" AS ENUM('active', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "membershipRole" AS ENUM('member', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "ratingSystem" AS ENUM('unknown', 'elo', 'glicko2');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "league" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"description" text,
	"game" "game" DEFAULT 'custom' NOT NULL,
	"maxScorePerMatch" integer DEFAULT 0 NOT NULL,
	"allowDraws" boolean DEFAULT true NOT NULL,
	"defaultRating" integer DEFAULT 1000 NOT NULL,
	"ratingSystem" "ratingSystem" DEFAULT 'unknown' NOT NULL,
	"ratingSystemParameters" json DEFAULT '{}'::json NOT NULL,
	"leagueStatus" "leagueStatus" DEFAULT 'active',
	"inviteCode" text DEFAULT substr(md5(random()::text), 0, 25) NOT NULL,
	"ownerId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "league_inviteCode_unique" UNIQUE("inviteCode")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"id" text PRIMARY KEY NOT NULL,
	"leagueId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberships" (
	"leagueId" text NOT NULL,
	"userId" text NOT NULL,
	"role" "membershipRole" DEFAULT 'member' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "memberships_userId_leagueId_pk" PRIMARY KEY("userId","leagueId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"leagueId" text NOT NULL,
	"teamsize" integer DEFAULT 1 NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"firstName" text,
	"lastName" text,
	"email" text NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"selectedLeagueId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feedback" ADD CONSTRAINT "feedback_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "league" ADD CONSTRAINT "league_ownerId_user_id_fk" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "matches_leagueId_league_id_fk" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_leagueId_league_id_fk" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberships" ADD CONSTRAINT "memberships_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_leagueId_league_id_fk" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
