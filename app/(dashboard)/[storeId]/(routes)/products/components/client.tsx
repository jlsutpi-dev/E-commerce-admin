"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns, ProductColumn } from "./columns";

import ApiList from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface ProductsClientProps {
  data: ProductColumn[];
}

const ProductsClient = ({ data }: ProductsClientProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Product (${data.length})`}
          description="Manage products for your store"
        />

        <Button
          onClick={() => {
            router.push(`/${params.storeId}/products/new`);
          }}
        >
          <Plus className=" mr-2 h-4 w-4 " />
          Add new
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey={"name"} />
      <Heading title="Api" description="Api calls for products" />
      <Separator />
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
};

export default ProductsClient;
