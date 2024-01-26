"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { getRecentLeagueMatches } from "@/db/model/match";
import { TimeDistance } from "@/components/time-distance";

interface RecentMatchesProps {
  matches: Awaited<ReturnType<typeof getRecentLeagueMatches>>
}

export function RecentMatches({ matches }: RecentMatchesProps) {
  return (
    <Table aria-label="Recent Matches">
      <TableHeader>
        <TableColumn>Team 1</TableColumn>
        <TableColumn>Result</TableColumn>
        <TableColumn>Team 2</TableColumn>
        <TableColumn>Date</TableColumn>
      </TableHeader>
      <TableBody items={matches}>
        {match => (
          <TableRow key={match.id}>
            <TableCell>{match.team1.name}</TableCell>
            <TableCell>{match.score1} {match.score2}</TableCell>
            <TableCell>{match.team2.name}</TableCell>
            <TableCell><TimeDistance date={match.createdAt} /></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
