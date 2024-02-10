"use client";

import { leaveLeagueAction } from "@/app/[locale]/my/leagues/actions";
import { GameChip } from "@/components/game-chip";
import { LeagueStatusChip } from "@/components/league-status-chip";
import { getUserLeagues } from "@/db/model/league";
import { Link } from "@/lib/navigation";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { EditIcon } from "@nextui-org/shared-icons";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { FaCrown } from "react-icons/fa6";
import { toast } from "react-toastify";

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
  const { execute, status } = useAction(leaveLeagueAction, {
    onSuccess: () => {
      toast("League left", { type: "success" });
    },
    onError: () => {
      toast("Failed to leave league", { type: "error" });
    },
  });

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
            <TableCell>
              <GameChip game={item.league.game} />
            </TableCell>
            <TableCell>
              <LeagueStatusChip status={item.league.status} />
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
                  type="submit"
                  color="danger"
                  onClick={() => {
                    if (!confirm(`Are you sure to leave ${item.league.name}`)) {
                      return;
                    }
                    execute({ leagueId: item.league.id });
                  }}
                  isLoading={isExecuting(status)}
                >
                  Leave
                </Button>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
