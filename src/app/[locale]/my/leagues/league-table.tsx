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
import { getLeaguesForUser } from "@/db/model/league";
import { FaCrown } from "react-icons/fa6";

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

export function LeagueTable({
  leagues,
}: {
  leagues: Awaited<ReturnType<typeof getLeaguesForUser>>;
}) {
  return (
    <Table aria-label="League table">
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={leagues}>
        {item => (
          <TableRow key={item.league.id}>
            <TableCell>
              <Avatar
                isBordered={true}
                src={item.league.image || undefined}
                name={item.league.name}
                radius="sm"
              />
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-bold text-sm">{item.league.name} {!!item.ownership && (<FaCrown />)}</p>
                <p className="text-bold text-sm text-default-400">
                  {item.teams} teams, {item.memberships} members, {item.matches} matches
                 </p>
              </div>
            </TableCell>
            <TableCell>
              <Chip color="success">Active</Chip>
            </TableCell>
            <TableCell>
              {item.ownership ? (
                <Button
                  isIconOnly={true}
                  as={Link}
                  href={`/my/leagues/${item.league.id}`}
                >
                  <EditIcon />
                </Button>
              ) : (
                <Button
                  as={Link}
                  href={`/my/leagues/${item.league.id}`}
                  color="danger"
                >
                  Leave League
                </Button>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
