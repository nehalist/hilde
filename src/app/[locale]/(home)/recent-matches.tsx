"use client";

import { RatingChange } from "@/components/rating-change";
import { TimeDistance } from "@/components/time-distance";
import { getRecentLeagueMatches } from "@/db/model/match";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface RecentMatchesProps {
  matches: Awaited<ReturnType<typeof getRecentLeagueMatches>>;
}

export function RecentMatches({ matches }: RecentMatchesProps) {
  return (
    <Table aria-label="Recent Matches">
      <TableHeader>
        <TableColumn width="30%">Team 1</TableColumn>
        <TableColumn width="5%">Result</TableColumn>
        <TableColumn width="30%">Team 2</TableColumn>
        <TableColumn width="20%">Date</TableColumn>
      </TableHeader>
      <TableBody items={matches}>
        {match => (
          <TableRow key={match.id}>
            <TableCell>
              {match.team1.name}{" "}
              {match.achievements
                .filter(a => a.teamId === match.team1Id)
                .map(a => a.achievement)
                .join(", ")}
              <RatingChange change={match.team1RatingChange} />
            </TableCell>
            <TableCell>
              {match.score1} {match.score2}
            </TableCell>
            <TableCell>
              {match.team2.name}{" "}
              {match.achievements
                .filter(a => a.teamId === match.team2Id)
                .map(a => a.achievement)
                .join(", ")}
              <RatingChange change={match.team2RatingChange} />
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
