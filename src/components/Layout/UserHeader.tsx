"use client";

import { Link } from "@/lib/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Spinner,
  User,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export function UserHeader() {
  const { data: user, status } = useSession();
  if (status === "loading") {
    return <Spinner />;
  }

  if (!user) {
    return;
  }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            name: "dude",
            src: user.user.image || "",
          }}
          className="transition-transform"
          name={user.user.name || "Unknown"}
          description={user.user.email}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownSection showDivider={true}>
          <DropdownItem key="settings" href="/my/settings" as={Link}>
            Settings
          </DropdownItem>
          <DropdownItem key="leagues" href="/my/leagues" as={Link}>
            Leagues
          </DropdownItem>
          <DropdownItem key="teams" href="/my/teams" as={Link}>
            Teams
          </DropdownItem>
        </DropdownSection>
        {/*<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> TODO*/}
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
