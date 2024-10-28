import db from "@/lib/prisma-db";

interface DashboardProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardProps) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active store :{store?.name}</div>;
};

export default DashboardPage;
