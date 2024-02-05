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
import { Team, User as UserModel } from "@/db/schema";
import { Card, CardHeader } from "@nextui-org/card";
import { FaUser } from "react-icons/fa";
import { TrashIcon } from "lucide-react";

export function UserTable({
  user,
}: {
  user: (UserModel & { teams: Team[] })[];
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
        <TableBody items={user}>
          {item => (
            <TableRow key={item.id}>
              <TableCell>
                <User
                  as="button"
                  avatarProps={{
                    showFallback: true,
                    fallback: <FaUser />,
                  }}
                  className="transition-transform"
                  name={item.name}
                  description={<>{item.teams.map(t => t.name).join(", ")}</>}
                />
              </TableCell>
              <TableCell className="text-right">
                <Button color="danger" size="sm">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
