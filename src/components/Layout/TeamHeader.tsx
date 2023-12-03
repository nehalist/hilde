"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { FaChevronDown } from "react-icons/fa";
import Link from 'next/link';

export function TeamHeader() {
  return (
    <div className="flex mb-3 items-center gap-10">
      <Dropdown placement="bottom-start" backdrop="blur">
        <DropdownTrigger>
          <Button
            variant="light"
            size="lg"
            className="flex p-2"
            disableRipple={true}
          >
            <User
              avatarProps={{
                isBordered: true,
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              description="2023"
              name="Lorem Ipsum"
            />
            <FaChevronDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="settings">My Settings</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link href="#">Dashboard</Link>
          </li>
          <li>
            <Link href="#">Matches</Link>
          </li>
          <li>
            <Link href="#">Team</Link>
          </li>
          <li>
            <Link href="#">Leaderboards</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
