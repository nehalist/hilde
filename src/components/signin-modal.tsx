import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import React from "react";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { Button, Input } from "@nextui-org/react";

export type SignInOperation = "signin" | "signup";

export function SignInModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: UseDisclosureReturn["isOpen"];
  onOpenChange: UseDisclosureReturn["onOpenChange"];
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader>Sign In</ModalHeader>
            <ModalBody>
              <form method="post" action="/api/auth/signin/email">
                <Input name="email" placeholder="you@example.com" required />
                <Button className="rounded-md px-4 py-2 text-foreground mb-2">
                  Sign In
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
