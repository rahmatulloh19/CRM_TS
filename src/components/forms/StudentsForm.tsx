import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { StudentsValidation } from "@/lib/validations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StudentsForm = () => {
  const form = useForm<z.infer<typeof StudentsValidation>>({
    resolver: zodResolver(StudentsValidation),
    defaultValues: {
      first_name_student: "",
      number: "",
      last_name_student: "",
      parent_name_student: "",
      parent_number_student: "",
      group: "",
      age_student: "",
    },
  });

  function onSubmit(values: z.infer<typeof StudentsValidation>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <h2 className="leading-[48px] font-semibold mb-8 text-[40px] tracking-[2px] text-[#0061F7]">Yangi o’quvchi qo’shish</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-8 justify-between items-end content-end">
        <FormField
          control={form.control}
          name="first_name_student"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">O’quvchi ismi</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-[#2F49D199]" type="text" placeholder="O’quvchi ismi ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">Telefon raqam</FormLabel>
              <FormControl>
                <Input type="number" className="focus-visible:ring-[#2F49D199]" placeholder="Telefon raqam ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name_student"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">O’quvchi familyasi</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-[#2F49D199]" placeholder="Ota-onasi ismi ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parent_name_student"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">Ota-onasi ismi</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-[#2F49D199]" placeholder="Ota-onasi ismi ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parent_number_student"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">Ota onasi nomeri</FormLabel>
              <FormControl>
                <Input type="number" className="focus-visible:ring-[#2F49D199]" placeholder="Ota onasi nomeri ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem className="w-[320px] focus-visible:ring-[#2F49D199]">
              <FormLabel className="text-xl tracking-wide font-semibold">Guruh</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus-visible:ring-[#2F49D199]">
                    <SelectValue placeholder="Guruh ..." />
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
          name="age_student"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">O’quvchi yoshi</FormLabel>
              <FormControl>
                <Input type="number" className="focus-visible:ring-[#2F49D199]" placeholder="O’quvchi yoshi ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-[320px] bg-[#2F49D1] hover:bg-[#2f4ad1df]" type="submit">
          Qo’shish
        </Button>
      </form>
    </Form>
  );
};

export default StudentsForm;
