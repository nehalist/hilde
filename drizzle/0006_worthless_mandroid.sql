ALTER TABLE "matches" ADD COLUMN "team1RatingChange" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "team1Rating" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "team2Rating" real DEFAULT 0 NOT NULL;