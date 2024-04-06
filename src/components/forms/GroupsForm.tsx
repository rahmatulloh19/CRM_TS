import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { GroupsValidation } from "@/lib/validations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddGroupMutation, useGetSubjectsQuery, useGetTeachersQuery, useGetWeekDaysQuery } from "@/lib/queries";
import { IGroup } from "@/types";

const GroupsForm = () => {
  const [addGroup, result] = useAddGroupMutation();
  result;

  const { data: subjects } = useGetSubjectsQuery(undefined);
  const { data: teachers } = useGetTeachersQuery(undefined);
  const { data: weekDays } = useGetWeekDaysQuery(undefined);

  const form = useForm<z.infer<typeof GroupsValidation>>({
    resolver: zodResolver(GroupsValidation),
    defaultValues: {
      group_name: "",
      group_time_start: "",
      group_time_stop: "",
      subject_id: "",
      week_id: "",
      teacher_id: "",
    },
  });

  const postGroup = async (value: IGroup) => {
    try {
      await addGroup(value).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  function onSubmit(values: z.infer<typeof GroupsValidation>) {
    postGroup(values);
  }
  return (
    <Form {...form}>
      <h2 className="leading-[48px] font-semibold mb-8 text-[40px] tracking-[2px] text-[#0061F7]">Yangi guruh qo’shish</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-8 justify-between items-end content-end">
        <FormField
          control={form.control}
          name="subject_id"
          render={({ field }) => (
            <FormItem className="w-[320px] focus-visible:ring-[#2F49D199]">
              <FormLabel className="text-xl tracking-wide font-semibold">Guruh yo’nalishi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus-visible:ring-[#2F49D199]">
                    <SelectValue placeholder="Guruh yo’nalishi ..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects?.data
                    ? subjects?.data?.map((subject: { id: number; subject_name: string }) => (
                        <SelectItem key={subject.id} value={`${subject.id}`}>
                          {subject.subject_name}
                        </SelectItem>
                      ))
                    : ""}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="week_id"
          render={({ field }) => (
            <FormItem className="w-[320px] focus-visible:ring-[#2F49D199]">
              <FormLabel className="text-xl tracking-wide font-semibold">Dars kunlari</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus-visible:ring-[#2F49D199]">
                    <SelectValue placeholder="Dars kunlari ..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {weekDays?.data
                    ? weekDays?.data?.map((days: { id: number; week_name: string }) => (
                        <SelectItem key={days.id} value={`${days.id}`}>
                          {days.week_name}
                        </SelectItem>
                      ))
                    : ""}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group_time_start"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">Dars boshlanishi vaqti</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-[#2F49D199]" type="time" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teacher_id"
          render={({ field }) => (
            <FormItem className="w-[320px] focus-visible:ring-[#2F49D199]">
              <FormLabel className="text-xl tracking-wide font-semibold ">O’qituvchi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus-visible:ring-[#2F49D199]">
                    <SelectValue placeholder="O’qituvchi ..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teachers?.data
                    ? teachers?.data?.map((teacher: { id: number; first_name: string; last_name: string }) => (
                        <SelectItem key={teacher.id} value={`${teacher.id}`}>
                          {`${teacher.first_name} ${teacher.last_name}`}
                        </SelectItem>
                      ))
                    : ""}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group_time_stop"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">Dars tugash vaqti</FormLabel>
              <FormControl>
                <Input type="time" className="focus-visible:ring-[#2F49D199]" placeholder="Ota onasi nomeri ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group_name"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">Guruh nomi</FormLabel>
              <FormControl>
                <Input type="text" className="focus-visible:ring-[#2F49D199]" placeholder="Guruh nomi..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="w-[320px] bg-[#2F49D1] hover:bg-[#2f4ad1df] ml-auto" type="submit">
          Qo’shish
        </Button>
      </form>
    </Form>
  );
};

export default GroupsForm;
