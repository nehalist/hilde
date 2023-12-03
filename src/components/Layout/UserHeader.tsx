"use client";

import Link from "next/link";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

export function UserHeader({ user }: { user: any }) {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            name: "dude",
            // src: user.user_metadata.avatar_url,
          }}
          className="transition-transform"
          // name={user.user_metadata.username || "Unknown"}
          name="unknown"
          description={user.email}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="settings" href="/my/settings" as={Link}>
          Settings
        </DropdownItem>
        <DropdownItem key="team_settings" href="/my/teams" as={Link}>
          Teams
        </DropdownItem>
        {/*<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> TODO*/}
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
