import db from "@/lib/prisma-db";
import { format } from "date-fns";

import BIllBoardsClient from "./components/client";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createAt: "desc" },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    createdAt: format(item.createAt, "MMMM do, yyyy"),
    label: item.label,
  }));
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <>
          <BIllBoardsClient data={formattedBillboards} />
        </>
      </div>
    </div>
  );
};

export default BillboardsPage;
