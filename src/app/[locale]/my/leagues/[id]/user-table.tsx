"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { User as UserComponent } from "@/components/user";
import { Team, User } from "@/db/schema";

export function UserTable({ user }: { user: (User & { teams: Team[] })[] }) {
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
      <TableBody items={user}>
        {item => (
          <TableRow key={item.id}>
            <TableCell>
              <UserComponent user={item} />
            </TableCell>
            <TableCell>{item.teams.map(t => t.name).join(", ")}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
