"use client";

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
import { League, Membership, User as UserModel } from "@/db/schema";
import { Card, CardHeader } from "@nextui-org/card";
import { FaUser } from "react-icons/fa";
import { useFormState, useFormStatus } from "react-dom";
import { removeMembershipAction } from "@/app/[locale]/my/leagues/[id]/actions";
import { useServerActionState } from "@/hooks/use-server-action-state";

function RemoveButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" color="danger" size="sm" isLoading={pending}>
      Remove
    </Button>
  );
}

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
      key: "actions",
      label: "",
    },
  ];
  const [state, formAction] = useFormState(removeMembershipAction, null);

  useServerActionState(state, {
    onSuccess: () => {
      return {
        message: "User removed",
      };
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
                />
              </TableCell>
              <TableCell className="text-right">
                {currentUser.id !== item.user.id && (
                  <form action={formAction}>
                    <input type="hidden" name="userId" value={item.user.id} />
                    <input type="hidden" name="leagueId" value={league.id} />
                    <RemoveButton />
                  </form>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
