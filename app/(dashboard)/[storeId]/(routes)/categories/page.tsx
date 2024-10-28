import db from "@/lib/prisma-db";
import { format } from "date-fns";

import CategoryClient from "./components/client";
import { CategoryColumn } from "./components/columns";

const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await db.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: { createAt: "desc" },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    createdAt: format(item.createAt, "MMMM do, yyyy"),
    billboardLabel: item.billboard.label,
    name: item.name,
  }));
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <>
          <CategoryClient data={formattedCategories} />
        </>
      </div>
    </div>
  );
};

export default Categories;
