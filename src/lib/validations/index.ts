import { z } from "zod";

const phoneRegex = new RegExp(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/);

export const StudentsValidation = z.object({
  first_name_student: z.string().min(2).max(50).trim(),
  number: z.string().regex(phoneRegex, "Invalid Number!"),
  last_name_student: z.string().min(2).max(50).trim(),
  parent_name_student: z.string().min(2).max(50).trim(),
  parent_number_student: z.string().regex(phoneRegex, "Invalid Number!").trim(),
  group: z.string().min(1).trim(),
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
export const GroupsValidation = z.object({
  type_group: z.string().min(2).max(50).trim(),
  day_lessons: z.string().min(1),
  starting_time: z.string().min(1),
  teacher: z.string().min(2),
  finishing_time: z.string().min(1).trim(),
  name_group: z.string().min(1).trim(),
});
