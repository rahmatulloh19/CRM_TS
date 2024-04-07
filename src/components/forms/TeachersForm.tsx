import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { TeachersValidation } from "@/lib/validations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChangeEvent } from "react";
import { useAddTeachersMutation, useGetSubjectsQuery } from "@/lib/queries";
import { ISubject, ITeacher } from "@/types";
import { useToast } from "../ui/use-toast";
import Loader from "../shared/Loader";

const TeachersForm = () => {
  const { toast } = useToast();
  const { data: subjects, isLoading: isSubjectLoading } = useGetSubjectsQuery(undefined);

  const [addTeacher] = useAddTeachersMutation();

  const form = useForm<z.infer<typeof TeachersValidation>>({
    resolver: zodResolver(TeachersValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      age: "",
      phone_number: "",
      subject_id: "",
    },
  });

  const postTeacher = async (data: ITeacher) => {
    try {
      await addTeacher(data).unwrap();
      toast({
        title: "Muvaffaqiyatli",
        description: "O'qtuvchi muvaffaqiyatli qo'shildi",
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

  function onSubmit(values: z.infer<typeof TeachersValidation>) {
    const formData = new FormData();
    formData.append("first_name", String(values.first_name));
    formData.append("phone_number", String(values.phone_number));
    formData.append("subject_id", String(values.subject_id));
    formData.append("age", String(values.age));
    formData.append("last_name", String(values.last_name));

    if (values.img instanceof File) {
      formData.append("img", values.img);
    }
    postTeacher(formData);
  }
  return (
    <Form {...form}>
      <h2 className="leading-[48px] font-semibold mb-8 text-[40px] tracking-[2px] text-[#0061F7]">Yangi o’qtuvchi qo’shish</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-8 justify-between items-end content-end">
        <FormField
          control={form.control}
          name="first_name"
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
          name="subject_id"
          render={({ field }) => (
            <FormItem className="w-[320px] focus-visible:ring-[#2F49D199]">
              <FormLabel className="text-xl tracking-wide font-semibold">Yo’nalish</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl className="focus-visible:ring-[#2F49D199]">
                  <SelectTrigger className="focus-visible:ring-[#2F49D199]">
                    <SelectValue placeholder="Yo’nalish ..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isSubjectLoading ? (
                    <SelectItem className="flex justify-center" unselectable="on" disabled value="Loading value">
                      <Loader />
                    </SelectItem>
                  ) : subjects?.data.length ? (
                    subjects?.data.map((subject: ISubject) => (
                      <SelectItem key={subject.id} value={`${subject.id}`}>
                        {subject.subject_name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem unselectable="on" value="Loading value" disabled>
                      Fanlar yo'q
                    </SelectItem>
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
              <FormLabel className="text-xl tracking-wide font-semibold">Yoshi</FormLabel>
              <FormControl>
                <Input type="number" className="focus-visible:ring-[#2F49D199]" placeholder="Yoshi ..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="img"
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
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
