import { ITeacherTable } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<ITeacherTable>();

export const teachersColumn = [
  columnHelper.accessor("id", {
    header: "№",
  }),
  columnHelper.accessor("full_name", {
    header: "O’qtuvchi ismi",
  }),
  columnHelper.accessor("number", {
    header: "Telefon nomeri",
  }),
  columnHelper.accessor("direction", {
    header: "Yo'nalish",
  }),
  columnHelper.accessor("age", {
    header: "Yoshi",
  }),
];
