import { IStudentTable } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<IStudentTable>();

export const columns = [
  columnHelper.accessor("id", {
    header: "№",
  }),
  columnHelper.accessor("full_name", {
    header: "O’quvchi ismi",
  }),
  columnHelper.accessor("number", {
    header: "Telefon nomer",
  }),
  columnHelper.accessor("direction", {
    header: "Yo’nalish",
  }),
  columnHelper.accessor("parent_full_name", {
    header: "Ota-ona(F.I.SH)",
  }),
  columnHelper.accessor("parent_number", {
    header: "Ota-ona (Tel)",
  }),
];
