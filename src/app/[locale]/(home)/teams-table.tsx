"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { getLeagueTeams } from "@/db/model/league";

interface TeamsTableProps {
  teams: Awaited<ReturnType<typeof getLeagueTeams>>;
}

export function TeamsTable({ teams }: TeamsTableProps) {
  return (
    <Table aria-label="League Teams">
      <TableHeader>
        <TableColumn>Team</TableColumn>
        <TableColumn>Size</TableColumn>
      </TableHeader>
      <TableBody items={teams}>
        {team => (
          <TableRow key={team.id}>
            <TableCell>
              {team.name}
            </TableCell>
            <TableCell>
              {team.teamSize}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

