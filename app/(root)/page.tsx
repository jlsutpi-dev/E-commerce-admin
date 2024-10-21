"use client";

import { UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetupPage = () => {
  const storeModal = useStoreModal();

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return (
    <div className=" p-4">
      <UserButton />

      <Button size={"default"}>click me</Button>
    </div>
  );
};

export default SetupPage;
