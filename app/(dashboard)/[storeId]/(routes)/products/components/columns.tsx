"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  isArchived: boolean;
  isFeatured: boolean;
  category: string;
  color: string;
  size: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  { accessorKey: "name", header: "Name" },

  { accessorKey: "price", header: "Price" },

  { accessorKey: "category", header: "Category" },

  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      return (
        <div className=" flex items-center gap-x-2">
          {row.original.color}
          <div
            className=" h-6 w-6 rounded-full border"
            style={{ backgroundColor: row.original.color }}
          />
        </div>
      );
    },
  },
  { accessorKey: "size", header: "Size" },

  { accessorKey: "isFeatured", header: "Featured" },

  { accessorKey: "isArchived", header: "Archived" },

  { accessorKey: "createdAt", header: "createdAt" },

  { id: "actions", cell: ({ row }) => <CellAction data={row.original} /> },
];
