"use client";

import { removeMembershipAction } from "@/app/[locale]/my/leagues/[id]/actions";
import { TimeDistance } from "@/components/time-distance";
import { League, Membership, User as UserModel } from "@/db/schema";
import { Card, CardHeader } from "@nextui-org/card";
import {
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { useAction } from "next-safe-action/hooks";
import { isExecuting } from "next-safe-action/status";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

export function MembershipsTable({
  memberships,
  currentUser,
  league,
}: {
  league: League;
  memberships: (Membership & { user: UserModel })[];
  currentUser: UserModel;
}) {
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "joined",
      label: "Joined",
    },
    {
      key: "actions",
      label: "",
    },
  ];
  const { execute, status } = useAction(removeMembershipAction, {
    onSuccess: () => {
      toast("Member removed", { type: "success" });
    },
    onError: () => {
      toast("Failed to remove member", { type: "error" });
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col">
          <p className="text-md">Users</p>
          <p className="text-small text-default-500">
            List of users in this league.
          </p>
        </div>
      </CardHeader>
      <Divider />
      <Table aria-label="League table" title="League users">
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={memberships}>
          {item => (
            <TableRow key={item.user.id}>
              <TableCell>
                <User
                  as="button"
                  avatarProps={{
                    showFallback: true,
                    fallback: <FaUser />,
                  }}
                  className="transition-transform"
                  name={item.user.name}
                  description={item.role}
                />
              </TableCell>
              <TableCell>
                <TimeDistance date={item.createdAt} />
              </TableCell>
              <TableCell className="text-right">
                {currentUser.id !== item.user.id && (
                  <Button
                    type="submit"
                    color="danger"
                    size="sm"
                    isLoading={isExecuting(status)}
                    onClick={() =>
                      execute({ leagueId: league.id, userId: item.user.id })
                    }
                  >
                    Remove
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
