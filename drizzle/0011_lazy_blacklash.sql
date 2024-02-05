ALTER TABLE "team" ADD COLUMN "achievementPoints" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "totalMatches" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "totalWins" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "totalWinRate" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "totalScore" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "totalAvgScore" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "totalHighestRating" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "totalLowestRating" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "totalHighestWinStreak" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "totalHighestLosingStreak" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "dailyMatches" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "dailyWins" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "dailyLosses" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "dailyWinRate" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "dailyScore" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "dailyAvgScore" real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "currentWinStreak" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "team" ADD COLUMN "currentLosingStreak" integer DEFAULT 0 NOT NULL;