import db from "@/lib/prisma-db";
import { format } from "date-fns";

import { formatter } from "@/lib/utils";
import OrderClient from "./components/client";
import { OrdersColumn } from "./components/columns";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await db.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
    orderBy: { createAt: "desc" },
  });

  const formattedOrders: OrdersColumn[] = orders.map((item) => ({
    id: item.id,
    createdAt: format(item.createAt, "MMMM do, yyyy"),
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems.map((item) => item.product.name).join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
  }));
  return (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <>
          <OrderClient data={formattedOrders} />
        </>
      </div>
    </div>
  );
};

export default OrdersPage;
