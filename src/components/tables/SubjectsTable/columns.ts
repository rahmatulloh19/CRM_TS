import { ISubjectTable } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<ISubjectTable>();

export const subjectsColumn = [
  columnHelper.accessor("id", {
    header: "№",
  }),
  columnHelper.accessor("subject_name", {
    header: "Fan nomi",
  }),
];
