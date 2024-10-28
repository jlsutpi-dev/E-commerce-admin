import db from "@/lib/prisma-db";
import { format } from "date-fns";

import SizesClient from "./components/client";
import { SizeColumn } from "./components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await db.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createAt: "desc" },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    createdAt: format(item.createAt, "MMMM do, yyyy"),
    value: item.value,
    name: item.name,
  }));
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <>
          <SizesClient data={formattedSizes} />
        </>
      </div>
    </div>
  );
};

export default SizesPage;
