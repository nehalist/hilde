import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";

interface TeamModalPros {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}

export function TeamModal({ isOpen, onOpenChange, onClose }: TeamModalPros) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Team Name</ModalHeader>
        <ModalBody>fooba</ModalBody>
      </ModalContent>
    </Modal>
  );
}
