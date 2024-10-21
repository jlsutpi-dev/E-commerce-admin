"use client ";

import { useEffect, useState } from "react";

import StoreModal from "@/components/modals/sotre-modal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
}
