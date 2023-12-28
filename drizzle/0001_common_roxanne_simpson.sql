DO $$ BEGIN
 CREATE TYPE "game" AS ENUM('custom', 'badminton');
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
ALTER TABLE "league" ADD COLUMN "game" "game" DEFAULT 'custom' NOT NULL;--> statement-breakpoint
ALTER TABLE "league" ADD COLUMN "maxScorePerMatch" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "league" ADD COLUMN "allowDraws" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "league" ADD COLUMN "ratingSystem" "ratingSystem" DEFAULT 'unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE "league" ADD COLUMN "ratingSystemParameters" json DEFAULT '{}'::json NOT NULL;