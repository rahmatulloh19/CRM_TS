import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { StudentsValidation } from "@/lib/validations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddStudentMutation, useGetGroupsQuery } from "@/lib/queries";
import { IStudent } from "@/types";
import { useToast } from "../ui/use-toast";

const StudentsForm = () => {
  const { toast } = useToast();
  const { data: groups, isLoading } = useGetGroupsQuery(undefined);

  const [addStudent] = useAddStudentMutation();

  const postStudent = async (student: IStudent) => {
    try {
      await addStudent(student).unwrap();
      toast({
        title: "Muvaffaqqiyatli",
        description: "Yangi o'quvchi qo'shildi",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Muvaffaqiyatsiz",
        description: "Xatolik",
        variant: "destructive",
      });
    }
  };

  const form = useForm<z.infer<typeof StudentsValidation>>({
    resolver: zodResolver(StudentsValidation),
    defaultValues: {
      first_name: "",
      phone_number: "",
      last_name: "",
      parent_name: "",
      parent_phone_number: "",
      group_id: "",
      age: "",
    },
  });

  function onSubmit(values: z.infer<typeof StudentsValidation>) {
    postStudent(values);
  }
  return (
    <Form {...form}>
      <h2 className="leading-[48px] font-semibold mb-8 text-[40px] tracking-[2px] text-[#0061F7]">Yangi o’quvchi qo’shish</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-8 justify-between items-end content-end">
        <FormField
          control={form.control}
          name="first_name"
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
          name="phone_number"
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
          name="last_name"
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
          name="parent_name"
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
          name="parent_phone_number"
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
          name="group_id"
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
                  {isLoading ? (
                    <SelectItem unselectable="on" value="Loading value">
                      Loading...
                    </SelectItem>
                  ) : (
                    groups?.data?.map((group: { id: number; group_name: string }) => (
                      <SelectItem key={group.id} value={`${group.id}`}>
                        {group.group_name}
                      </SelectItem>
                    ))
                  )}
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
