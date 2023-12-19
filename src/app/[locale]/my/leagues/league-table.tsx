"use client";

import {
  Avatar,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { EditIcon } from "@nextui-org/shared-icons";
import { Link } from "@/lib/navigation";
import { League } from "@prisma/client";

const columns = [
  {
    key: "image",
    label: "",
  },
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
  },
];

export function LeagueTable({ leagues }: { leagues: League[] }) {
  return (
    <Table aria-label="League table">
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={leagues}>
        {item => (
          <TableRow key={item.id}>
            <TableCell>
              <Avatar
                isBordered={true}
                src={item.image || undefined}
                name={item.name}
                radius="sm"
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-col">{item.name}</div>
            </TableCell>
            <TableCell>
              <Chip color="success">Active</Chip>
            </TableCell>
            <TableCell>
              <Button
                isIconOnly={true}
                as={Link}
                href={`/my/leagues/${item.id}`}
              >
                <EditIcon />
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
