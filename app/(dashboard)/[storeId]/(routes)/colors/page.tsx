import db from "@/lib/prisma-db";
import { format } from "date-fns";

import ColorsClient from "./components/client";
import { ColorColumn } from "./components/columns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await db.color.findMany({
    where: { storeId: params.storeId },
    orderBy: { createAt: "desc" },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    createdAt: format(item.createAt, "MMMM do, yyyy"),
    value: item.value,
    name: item.name,
  }));
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <>
          <ColorsClient data={formattedColors} />
        </>
      </div>
    </div>
  );
};

export default ColorsPage;
