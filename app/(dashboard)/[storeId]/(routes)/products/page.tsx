import db from "@/lib/prisma-db";
import { format } from "date-fns";

import { formatter } from "@/lib/utils";
import ProductsClient from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await db.product.findMany({
    where: { storeId: params.storeId },
    orderBy: { createAt: "desc" },
    include: {
      category: true,
      size: true,
      color: true,
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price.toNumber()),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    color: item.color.value,
    size: item.color.name,
    category: item.category.name,
    createdAt: format(item.createAt, "MMMM do, yyyy"),
  }));
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <>
          <ProductsClient data={formattedProducts} />
        </>
      </div>
    </div>
  );
};

export default ProductPage;
