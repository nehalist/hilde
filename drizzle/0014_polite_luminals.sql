ALTER TABLE "team" DROP CONSTRAINT "team_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "team" ALTER COLUMN "userId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "comment" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team" ADD CONSTRAINT "team_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "league" DROP COLUMN IF EXISTS "maxScorePerMatch";