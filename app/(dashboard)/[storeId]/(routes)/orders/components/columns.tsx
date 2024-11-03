"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrdersColumn = {
  id: string;
  products: string;
  phone: string;
  address: string;
  totalPrice: string;
  isPaid: boolean;

  createdAt: string;
};

export const columns: ColumnDef<OrdersColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
  },
];
