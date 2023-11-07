import Link from "next/link";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

export function UserHeader() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button as={Link} color="primary" href="/api/auth/signin" variant="flat">
        Sign In
      </Button>
    );
  }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            name: "dude",
          }}
          className="transition-transform"
          description="@tonyreichert"
          name="Tony Reichert"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">{session.user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="team_settings">Teams</DropdownItem>
        {/*<DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> TODO*/}
        <DropdownItem key="logout" color="danger" href="/api/auth/signout">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
