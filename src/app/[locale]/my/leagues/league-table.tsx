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
import { getUserLeagues } from "@/db/model/league";
import { FaCrown } from "react-icons/fa6";
import { leaveLeagueAction } from "@/app/[locale]/my/leagues/actions";
import { useFormState } from "react-dom";
import { GameChip } from "@/components/game-chip";
import { LeagueStatusChip } from "@/components/league-status-chip";

const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "game",
    label: "Game",
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
  leagues: Awaited<ReturnType<typeof getUserLeagues>>;
}) {
  const [state, leaveFormAction] = useFormState(leaveLeagueAction, null);

  return (
    <Table aria-label="League table">
      <TableHeader columns={columns}>
        {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={leagues}>
        {item => (
          <TableRow key={item.league.id}>
            <TableCell>
              <div className="flex gap-5 items-center">
                <Avatar
                  isBordered={true}
                  src={item.league.image || undefined}
                  name={item.league.name}
                  radius="sm"
                />
                <div className="flex flex-col">
                  <p className="font-semibold flex gap-3 items-center">
                    {item.league.name}{" "}
                    {!!item.ownership && <FaCrown className="text-green-400" />}
                  </p>
                  <p className="text-sm text-default-400">
                    {item.league.description || "No description"}
                  </p>
                  <div className="flex gap-3 text-xs">
                    <p>
                      <b>{item.teams}</b> teams
                    </p>
                    <p>
                      <b>{item.memberships}</b> members
                    </p>
                    <p>
                      <b>{item.matches}</b> matches
                    </p>
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell><GameChip game={item.league.game} /></TableCell>
            <TableCell><LeagueStatusChip status={item.league.status} /></TableCell>
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
                <form
                  action={leaveFormAction}
                  onSubmit={e => {
                    if (!confirm(`Are you sure to leave ${item.league.name}`)) {
                      e.preventDefault();
                    }
                  }}
                >
                  <input type="hidden" name="leagueId" value={item.league.id} />
                  <Button type="submit" color="danger">
                    Leave
                  </Button>
                </form>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
