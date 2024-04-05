import { z } from "zod";

const PHONE_REGEXP = new RegExp(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/);

const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const StudentsValidation = z.object({
  first_name_student: z.string().min(2).max(50).trim(),
  number: z.string().regex(PHONE_REGEXP, "Invalid Number!"),
  last_name_student: z.string().min(2).max(50).trim(),
  parent_name_student: z.string().min(2).max(50).trim(),
  parent_number_student: z.string().regex(PHONE_REGEXP, "Invalid Number!").trim(),
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

export const TeachersValidation = z.object({
  first_name_teacher: z.string().min(2).max(50).trim(),
  number: z.string().regex(PHONE_REGEXP, "Invalid Number!"),
  direction: z.string().min(1).trim(),
  age: z
    .string()
    .min(1)
    .refine((value) => {
      if (+value >= 8 && +value <= 28) {
        return true;
      }

      return false;
    }),
  image: z
    .any()
    .refine((files) => {
      return files?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type), "Only .jpg, .jpeg, .png and .webp formats are supported."),
  last_name_teacher: z.string().min(2).max(50),
});

export const SubjectValidation = z.object({
  subject_name: z.string().min(2).max(50).trim(),
});
