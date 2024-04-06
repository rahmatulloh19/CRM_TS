import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SubjectValidation } from "@/lib/validations";
import { useAddSubjectMutation } from "@/lib/queries";

const SubjectsForm = () => {
  const [addSubject, result] = useAddSubjectMutation({});

  const form = useForm<z.infer<typeof SubjectValidation>>({
    resolver: zodResolver(SubjectValidation),
    defaultValues: {
      subject_name: "",
    },
  });

  const postSubject = async (values: { subject_name: string }) => {
    try {
      await addSubject(values).unwrap();
      result.reset();
    } catch (error) {
      console.log(error);
    }
  };

  async function onSubmit(values: z.infer<typeof SubjectValidation>) {
    postSubject(values);
  }
  return (
    <Form {...form}>
      <h2 className="leading-[48px] font-semibold mb-8 text-[40px] tracking-[2px] text-[#0061F7]">Yangi fan qo’shish</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-8 justify-between items-end content-end">
        <FormField
          control={form.control}
          name="subject_name"
          render={({ field }) => (
            <FormItem className="w-[320px]">
              <FormLabel className="text-xl tracking-wide font-semibold">Fan nomi</FormLabel>
              <FormControl>
                <Input className="focus-visible:ring-[#2F49D199]" type="text" placeholder="Fan nomi ..." {...field} />
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

export default SubjectsForm;
