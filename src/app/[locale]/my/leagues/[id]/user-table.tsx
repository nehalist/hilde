"use client";

import { getLeagueWithUser } from "@/db/model/league";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { User } from "@/components/user";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  // {
  //   key: "actions",
  //   label: "",
  // },
];

export function UserTable({
  data,
}: {
  data: Awaited<ReturnType<typeof getLeagueWithUser>>;
}) {
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
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
