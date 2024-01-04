"use client";

import { getLeagueWithUser } from "@/db/model/league";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { User } from "@/components/user";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export function UserTable({
  data,
}: {
  data: Awaited<ReturnType<typeof getLeagueWithUser>>;
}) {
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "teams",
      label: "Teams",
    },
  ];

  return (
    <Table aria-label="League table">
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data.user}>
        {item => (
          <TableRow key={item.id}>
            <TableCell>
              <User user={item} />
            </TableCell>
            <TableCell>
              {item.teams.map(t => t.name).join(", ")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
