"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";

interface SettingFormProps {
  initialData: Store;
}
const formSchema = z.object({
  name: z.string().min(1),
});
type SettingFromValues = z.infer<typeof formSchema>;

export const SettingForm = ({ initialData }: SettingFormProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<SettingFromValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  // setting data change handler
  const onSubmit = async (data: SettingFromValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("store updated");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //setting data delete handler
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Make sure you remove all categories and products first ");
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
        loading={loading}
      />
      <div
        style={{ marginTop: "0px" }}
        className="flex items-center justify-between"
      >
        <Heading title="Setting" description="manage store preference" />
        <Button
          disabled={loading}
          variant={"destructive"}
          size={"sm"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <Trash className=" h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-8 w-full"
        >
          <div className=" grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {" "}
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL "
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};
