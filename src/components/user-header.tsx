"use client";

import { Link } from "@/lib/navigation";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Progress,
  Spinner,
  User,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { UserIcon } from "lucide-react";
import { FaUser } from "react-icons/fa";

export function UserHeader() {
  const { data: user, status } = useSession();
  if (status === "loading") {
    return <Spinner />;
  }

  if (!user) {
    return;
  }

  const dropdownItems = [
    {
      key: "settings",
      href: "/my/settings",
      label: "Settings",
    },
    {
      key: "leagues",
      href: "/my/leagues",
      label: "Leagues",
    },
    {
      key: "teams",
      href: "/my/teams",
      label: "Teams",
    },
  ];

  if (user.user.role === "admin") {
    dropdownItems.push({
      key: "admin",
      href: "/admin",
      label: "Administration",
    });
  }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            showFallback: true,
            fallback: <FaUser />,
          }}
          className="transition-transform"
          name={user.user.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownSection showDivider={true}>
          {dropdownItems.map(item => (
            <DropdownItem key={item.key} href={item.href} as={Link}>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
