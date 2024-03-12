"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { SignInModal } from "@/components/signin-modal";
import Link from "next/link";

export function AnonHeader() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" variant="flat" href="/api/auth/signin" as={Link}>
        Sign In
      </Button>
      <SignInModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
