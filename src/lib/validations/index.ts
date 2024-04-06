import { z } from "zod";

const PHONE_REGEXP = new RegExp(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/);

export const StudentsValidation = z.object({
  first_name: z.string().min(2).max(50).trim(),
  phone_number: z.string().regex(PHONE_REGEXP, "Invalid Number!"),
  last_name: z.string().min(2).max(50).trim(),
  parent_name: z.string().min(2).max(50).trim(),
  parent_phone_number: z.string().regex(PHONE_REGEXP, "Invalid Number!").trim(),
  group_id: z.string().min(1).trim(),
  age: z
    .string()
    .min(1)
    .refine((value) => {
      if (+value >= 8 && +value <= 28) {
        return true;
      }

      return false;
    }),
});

export const StudentsUpdateValidation = z.object({
  id: z.number().min(1),
  first_name: z.string().min(1).max(50).trim(),
  last_name: z.string().min(1).max(50).trim(),
  age: z.number().min(1) || z.string().min(1),
  phone_number: z.number().min(1),
});

export const GroupsValidation = z.object({
  group_name: z.string().min(2).max(50).trim(),
  group_time_start: z.string().min(1),
  group_time_stop: z.string().min(1),
  subject_id: z.string().min(1),
  week_id: z.string().min(1).trim(),
  teacher_id: z.string().min(1).trim(),
});

export const TeachersValidation = z.object({
  first_name: z.string().min(2).max(50).trim(),
  phone_number: z.number().min(1),
  subject_id: z.number().min(1),
  age: z.number().min(8).max(28),
  img: z.unknown(),
  last_name: z.string().min(2).max(50),
});

export const TeacherUpdateValidation = z.object({
  id: z.number().min(1),
  first_name: z.string().min(2).max(50),
  age: z.number().min(1),
  img: z.unknown(),
});

export const SubjectValidation = z.object({
  subject_name: z.string().min(2).max(50).trim(),
});
