export type ISideBarLink = {
  imageUrl: string;
  label: string;
  route: string;
};

export type IStudentTable = {
  id: number;
  full_name: string;
  number: string;
  direction: string;
  parent_full_name: string;
  parent_number: string;
  age?: string | "";
};

export type ITeacherTable = {
  id: number;
  full_name: string;
  number: string;
  direction: string;
  age: number;
};

export type ISubjectTable = {
  id: number;
  subject_name: string;
};

export type IGroup = {
  id?: number;
  group_name: string;
  group_time_start: string;
  group_time_stop: string;
  subject_id: string;
  week_id: string;
  teacher_id: string;
  teachers?: {
    first_name: string;
    last_name: string;
    phone_number: string;
    img: unknown;
  };
  weeks?: {
    id: number;
    week_name: string;
  };
  students?: [];
};

export type ITeacher = {
  id?: number;
  first_name: string;
  phone_number: string;
  subject_id: string;
  age: string;
  img?: File;
  last_name: string;
  subjects?: {
    id?: number;
    subject_name?: string;
  };
};

export type ISubject = {
  id: number;
  subject_name: string;
  group: [];
};

export type IStudent = {
  id?: number;
  first_name: string;
  last_name: string;
  age: string;
  phone_number: string;
  parent_name: string;
  parent_phone_number: string;
  group_id: string;
  groups?: {
    group_name: string;
  };
};

export type IUpdateStudent = {
  id?: number;
  first_name: string;
  phone_number: number;
  last_name: string;
  age: number;
};

export type IUpdateTeacher = {
  id?: number;
  first_name: string;
  age: number;
  img?: unknown;
};
