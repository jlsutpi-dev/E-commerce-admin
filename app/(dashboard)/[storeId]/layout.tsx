import Navbar from "@/components/navbar";
import db from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashBoardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();

  const store = await db.store.findFirst({
    where: { id: params.storeId, userId: String(userId) },
  });
  if (!userId) {
    return redirect("/sign-in");
  }
  if (!store) {
    return redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashBoardLayout;
