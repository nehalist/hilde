ALTER TABLE "team" ADD CONSTRAINT "team_name_leagueId_unique" UNIQUE("name","leagueId");