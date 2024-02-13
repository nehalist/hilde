"use client";

import { Rating } from "@/components/rating";
import { RatingChange } from "@/components/rating-change";
import { Score } from "@/components/score";
import { TimeDistance } from "@/components/time-distance";
import { getRecentLeagueMatches } from "@/db/model/match";
import { Achievement, Team } from "@/db/schema";
import { Link } from "@/lib/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";

interface RecentMatchesProps {
  matches: Awaited<ReturnType<typeof getRecentLeagueMatches>>;
}

function MatchTableTeam({
  team,
  matchRating,
  matchRatingChange,
  matchAchievements,
  score,
  win,
}: {
  team: Team;
  matchRating: number;
  matchRatingChange: number;
  matchAchievements: Achievement[];
  score: number;
  win: boolean;
}) {
  const emoji = win ? (
    "🏆"
  ) : score === 0 ? (
    "✂️"
  ) : (
    <span className="opacity-25" style={{ filter: "grayscale(100%)" }}>
      😔
    </span>
  );
  const t = useTranslations("achievements");
  const achievements = matchAchievements.map(a => t(a.achievement)).join(", ");

  return (
    <div className="flex gap-3 items-center">
      <div className="text-2xl min-w-8 text-center">{emoji}</div>
      <div>
        <p>
          <Link href={`/teams/${team.id}`}>{team.name}</Link>{" "}
        </p>
        <div className="text-default-400 flex gap-3 whitespace-nowrap overflow-hidden text-ellipsis w-64">
          <p>
            <Rating rating={matchRating} />{" "}
            <RatingChange change={matchRatingChange} />
          </p>
          <p className="text-ellipsis overflow-hidden">
            <Tooltip content={achievements}>
              <span>{achievements}</span>
            </Tooltip>
          </p>
        </div>
      </div>
    </div>
  );
}

export function RecentMatches({ matches }: RecentMatchesProps) {
  return (
    <Table aria-label="Recent Matches">
      <TableHeader>
        <TableColumn width="30%">Team 1</TableColumn>
        <TableColumn width="10%">Result</TableColumn>
        <TableColumn width="30%">Team 2</TableColumn>
        <TableColumn width="20%">Date</TableColumn>
      </TableHeader>
      <TableBody items={matches}>
        {match => (
          <TableRow key={match.id}>
            <TableCell>
              <MatchTableTeam
                team={match.team1}
                matchRating={match.team1Rating}
                matchRatingChange={match.team1RatingChange}
                matchAchievements={match.achievements.filter(
                  a => a.teamId === match.team1Id,
                )}
                score={match.score1}
                win={match.score1 > match.score2}
              />
            </TableCell>
            <TableCell>
              <Score score={match.score1} /> : <Score score={match.score2} />
            </TableCell>
            <TableCell>
              <MatchTableTeam
                team={match.team2}
                matchRating={match.team2Rating}
                matchRatingChange={match.team2RatingChange}
                matchAchievements={match.achievements.filter(
                  a => a.teamId === match.team2Id,
                )}
                score={match.score2}
                win={match.score2 > match.score1}
              />
            </TableCell>
            <TableCell>
              <TimeDistance date={match.createdAt} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
