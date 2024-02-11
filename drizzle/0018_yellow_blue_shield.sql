ALTER TABLE "team" ALTER COLUMN "totalHighestRating" SET DEFAULT 1000;--> statement-breakpoint
ALTER TABLE "team" ALTER COLUMN "totalLowestRating" SET DEFAULT 1000;--> statement-breakpoint
ALTER TABLE "league" DROP COLUMN IF EXISTS "image";