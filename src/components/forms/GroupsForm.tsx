import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { GroupsValidation } from "@/lib/validations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const GroupsForm = () => {
  const form = useForm<z.infer<typeof GroupsValidation>>({
    resolver: zodResolver(GroupsValidation),
    defaultValues: {
      type_group: "",
      day_lessons: "",
      starting_time: "",
      teacher: "",
      finishing_time: "",
      name_group: "",
    },
  });

  function onSubmit(values: z.infer<typeof GroupsValidation>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <h2 className="leading-[48px] font-semibold mb-8 text-[40px] tracking-[2px] text-[#0061F7]">Yangi guruh qo’shish</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-8 justify-between items-end content-end">
        <FormField
          control={form.control}
          name="type_group"
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
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="day_lessons"
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
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="starting_time"
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
          name="teacher"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">O’qituvchi</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-[#2F49D199]" placeholder="O’qituvchi ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="finishing_time"
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
          name="name_group"
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
