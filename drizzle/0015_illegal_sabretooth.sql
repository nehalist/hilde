CREATE TABLE IF NOT EXISTS "achievement" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"teamId" text NOT NULL,
	"matchId" text NOT NULL,
	"achievement" text NOT NULL,
	CONSTRAINT "achievement_achievement_teamId_unique" UNIQUE("achievement","teamId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievement" ADD CONSTRAINT "achievement_teamId_team_id_fk" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievement" ADD CONSTRAINT "achievement_matchId_matches_id_fk" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
