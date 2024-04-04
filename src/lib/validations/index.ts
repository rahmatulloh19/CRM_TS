import { z } from "zod";

const phoneRegex = new RegExp(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/);

export const StudentsValidation = z.object({
  first_name_student: z.string().min(2).max(50).trim(),
  number: z.string().regex(phoneRegex, "Invalid Number!"),
  last_name_student: z.string().min(2).max(50).trim(),
  parent_name_student: z.string().min(2).max(50).trim(),
  parent_number_student: z.string().regex(phoneRegex, "Invalid Number!").trim(),
  group: z
    .string({
      required_error: "Group required !",
    })
    .min(1)
    .trim(),
  age_student: z
    .string()
    .min(1)
    .refine((value) => {
      if (+value >= 8 && +value <= 28) {
        return true;
      }

      return false;
    }),
});
