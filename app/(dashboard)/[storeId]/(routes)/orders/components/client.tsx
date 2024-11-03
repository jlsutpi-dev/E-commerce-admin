"use client";

import { columns, OrdersColumn } from "./columns";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface OrderClientProps {
  data: OrdersColumn[];
}

const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage order for your store"
      />
      <Separator />
      <DataTable columns={columns} data={data} searchKey={"products"} />
    </>
  );
};

export default OrderClient;
