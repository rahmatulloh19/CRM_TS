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
