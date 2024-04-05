import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { TeachersValidation } from "@/lib/validations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChangeEvent } from "react";

const TeachersForm = () => {
  const form = useForm<z.infer<typeof TeachersValidation>>({
    resolver: zodResolver(TeachersValidation),
    defaultValues: {
      first_name_teacher: "",
      number: "",
      direction: "",
      age: "",
      image: "",
      last_name_teacher: "",
    },
  });

  function onSubmit(values: z.infer<typeof TeachersValidation>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <h2 className="leading-[48px] font-semibold mb-8 text-[40px] tracking-[2px] text-[#0061F7]">Yangi o’qtuvchi qo’shish</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-8 justify-between items-end content-end">
        <FormField
          control={form.control}
          name="first_name_teacher"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">O’qtuvchi ismi</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-[#2F49D199]" type="text" placeholder="O’qtuvchi ismi ..." {...field} />
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
          name="direction"
          render={({ field }) => (
            <FormItem className="w-[320px] focus-visible:ring-[#2F49D199]">
              <FormLabel className="text-xl tracking-wide font-semibold">Yo’nalish</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus-visible:ring-[#2F49D199]">
                    <SelectValue placeholder="Yo’nalish ..." />
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
          name="age"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">Yoshi</FormLabel>
              <FormControl>
                <Input type="number" className="focus-visible:ring-[#2F49D199]" placeholder="Yoshi ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">Rasm 3x4</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="focus-visible:ring-[#2F49D199]"
                  placeholder="Rasm 3x4 ..."
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    if (evt.target.files) {
                      value;
                      onChange(evt.target.files[0]);
                    }
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name_teacher"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">O’qtuvchi familiyasi</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-[#2F49D199]" placeholder="O’qtuvchi familiyasi ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-[320px] ml-auto bg-[#2F49D1] hover:bg-[#2f4ad1df]" type="submit">
          Qo’shish
        </Button>
      </form>
    </Form>
  );
};

export default TeachersForm;
