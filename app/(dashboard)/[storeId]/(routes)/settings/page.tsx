import db from "@/lib/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SettingForm } from "./components/setting-form";

interface SettingPageProps {
  params: { storeId: string };
}
const SettingPage = async ({ params }: SettingPageProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await db.store.findFirst({
    where: { userId, id: params.storeId },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <div className=" flex-col ">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        {" "}
        <SettingForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingPage;
