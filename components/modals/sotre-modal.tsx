"use client";

import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export default function StoreModal() {
  const storeModal = useStoreModal();
  return (
    <div>
      <Modal
        title="create store"
        description="Add a new store to manage products and categories"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        Future create store form
      </Modal>
    </div>
  );
}
