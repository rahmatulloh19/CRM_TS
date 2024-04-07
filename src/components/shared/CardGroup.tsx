import { BASE_URL, useEditGroupMutation, useRemoveGroupMutation } from "@/lib/queries";
import { IGroup, IUpdateGroup } from "@/types";
import DialogComponent from "./DialogComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { GroupsUpdateValidation } from "@/lib/validations";
import { useToast } from "../ui/use-toast";

const CardGroup = ({ group }: { group: IGroup }) => {
  const { toast } = useToast();
  const [editGroup] = useEditGroupMutation();
  const [removeGroup] = useRemoveGroupMutation();

  const deleteGroup = async (id: number) => {
    try {
      await removeGroup(id).unwrap();
      toast({
        title: "Muvaffaqiyatli",
        description: "Ma'lumotlar o'chirildi",
      });
    } catch (error) {
      toast({
        title: "Muvaffaqiyatsiz",
        description: "Xatolik",
        variant: "destructive",
      });
    }
  };

  const updateGroup = async (values: IUpdateGroup) => {
    try {
      await editGroup(values).unwrap();
      toast({
        title: "Muvaffaqiyatli",
        description: "Ma'lumotlar o'zgartirildi",
      });
    } catch (error) {
      toast({
        title: "Muvaffaqiyatsiz",
        description: "Xatolik",
        variant: "destructive",
      });
    }
  };

  const form = useForm<z.infer<typeof GroupsUpdateValidation>>({
    resolver: zodResolver(GroupsUpdateValidation),
  });

  function onSubmit(values: z.infer<typeof GroupsUpdateValidation>) {
    updateGroup(values);
  }
  return (
    <li className="shadow-2xl rounded-b-2xl">
      <div className="bg-[#2F49D1] rounded-t-2xl py-[18px] relative">
        <h3 className="text-center text-xl font-semibold text-white">{group.group_name}</h3>
        <DialogComponent
          trigger={
            <img
              className="absolute top-1/2 right-7 -translate-y-1/2 bg-white p-1 rounded-lg cursor-pointer active:scale-95 transition-transform"
              src="/assets/icons/edit.svg"
              alt="Pen's icon"
              onClick={() => {
                form.setValue("group_name", group.group_name);
                form.setValue("group_time_start", group.group_time_start);
                form.setValue("group_time_stop", group.group_time_stop);
                form.setValue("id", `${group.id}`);
              }}
            />
          }
        >
          <h1 className="text-xl font-bold tracking-wider mb-4 mt-2 text-[#405ce7]">{group.group_name}ning ma'lumotlarini tahrirlash</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end flex-wrap gap-4 justify-between w-[500px]">
              <FormField
                control={form.control}
                name="group_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Guruh nomi</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-[#2F49D199]" placeholder="Guruh nomi ..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between grow space-x-4">
                <FormField
                  control={form.control}
                  name="group_time_start"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Dars boshlanish vaqti</FormLabel>
                      <FormControl>
                        <Input className="focus-visible:ring-[#2F49D199]" type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="group_time_stop"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Dars tugash vaqti</FormLabel>
                      <FormControl>
                        <Input className="focus-visible:ring-[#2F49D199]" type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex grow ml-auto mt-4 w-1/2 items-end">
                <Button
                  className="bg-red-500 hover:bg-red-600 transition"
                  type="button"
                  onClick={() => {
                    if (group.id) {
                      deleteGroup(group.id);
                    }
                  }}
                >
                  O'chirish
                </Button>
                <Button className="bg-orange-600 ml-auto hover:bg-orange-700 transition" type="submit">
                  Tahrirlash
                </Button>
              </div>
            </form>
          </Form>
        </DialogComponent>
      </div>
      <div className="p-3 pb-6">
        <div className="flex gap-3 mb-8">
          <img className="shrink-0 rounded-full" src={`${BASE_URL}${group.teachers?.img}` || "/assets/images/matem.png"} width={80} height={80} alt="" />
          <div className="flex flex-col">
            <div className="flex justify-end gap-3 grow">
              <h4 className="text-[#001062] font-bold">O’qituvchi:</h4>
              <p className="text-right">{`${group.teachers?.first_name} ${group.teachers?.last_name}`}</p>
            </div>
            <div className="flex justify-between gap-3">
              <h4 className="text-[#001062] font-bold">Tell raqam:</h4>
              <p className="text-right">{group.teachers?.phone_number}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-3">
          <strong className="text-[#001062]">Dars kunlari:</strong>
          <p>{group.weeks?.week_name}</p>
        </div>
        <div className="flex justify-between mb-3">
          <strong className="text-[#001062]">Dars vaqti:</strong>
          <p>{`${group.group_time_start}-${group.group_time_stop}`}</p>
        </div>
        <div className="flex justify-between">
          <strong className="text-[#001062]">O’quvchilar soni:</strong>
          <p>{group.students?.length} ta</p>
        </div>
      </div>
    </li>
  );
};

export default CardGroup;
