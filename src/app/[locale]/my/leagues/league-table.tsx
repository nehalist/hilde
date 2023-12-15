"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { League } from "@prisma/client";
import { EditIcon } from "@nextui-org/shared-icons";
import { Link } from "@/lib/navigation";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "",
  }
];

export function LeagueTable({ leagues }: { leagues: League[] }) {
  return (
    <Table aria-label="League table" isStriped={true}>
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={leagues}>
        {item => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>...</TableCell>
            <TableCell>
              <Button isIconOnly={true} as={Link} href={`/my/leagues/${item.id}`}>
                <EditIcon />
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
