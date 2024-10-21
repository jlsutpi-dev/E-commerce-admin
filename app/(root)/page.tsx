import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
  return (
    <div className=" p-4">
      <UserButton />

      <Button size={"default"}>click me</Button>
    </div>
  );
};

export default SetupPage;
