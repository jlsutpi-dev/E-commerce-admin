"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";

import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface BIllBoardsClientProps {
  data: BillboardColumn[];
}

const BIllBoardsClient = ({ data }: BIllBoardsClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboard for your store"
        />

        <Button
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`);
          }}
        >
          <Plus className=" mr-2 h-4 w-4 " />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey={"label"} />
      <Heading title="Api" description="Api calls for billboards" />
      <Separator />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
};

export default BIllBoardsClient;
