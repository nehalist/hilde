ALTER TABLE "league" ALTER COLUMN "inviteCode" SET DEFAULT substr
  (md5(random()::text), 0, 25);--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "team1Id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "score1" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "team2Id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "score2" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "matches" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "matches_team1Id_team_id_fk" FOREIGN KEY ("team1Id") REFERENCES "team"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "matches_team2Id_team_id_fk" FOREIGN KEY ("team2Id") REFERENCES "team"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "matches_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
