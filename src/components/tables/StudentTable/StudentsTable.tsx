import { FormEvent, useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, PaginationState, getFilteredRowModel } from "@tanstack/react-table";
import { studentsColumns as columns } from "./columns";
import { IStudent, IStudentTable, IUpdateStudent } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import DialogComponent from "@/components/shared/DialogComponent";
import { Input } from "@/components/ui/input";
import { useEditStudentMutation, useGetStudentsQuery, useRemoveStudentMutation } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { StudentsUpdateValidation } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const StudentsTable = () => {
  const { toast } = useToast();
  const { data: students, isLoading } = useGetStudentsQuery(undefined);

  const [data, setData] = useState<IStudentTable[]>(() => []);
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const [editStudent] = useEditStudentMutation();

  const updateStudent = async (student: IUpdateStudent) => {
    try {
      await editStudent(student).unwrap();
      toast({
        title: "O'quvchi yangilandi",
        description: "O'quvchi muvaffaqiyatli yangilandi",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Muvaffaqiyatsiz",
        description: "Xatolik",
        variant: "destructive",
      });
    }
  };

  const form = useForm<z.infer<typeof StudentsUpdateValidation>>({
    resolver: zodResolver(StudentsUpdateValidation),
    mode: "all",
  });

  function onSubmit(values: z.infer<typeof StudentsUpdateValidation>) {
    updateStudent(values);
  }

  const [deleteStudent] = useRemoveStudentMutation();

  const handleDeleteStudent = async (evt: FormEvent, id: number) => {
    evt.preventDefault();
    await deleteStudent(id)
      .then(() => {
        toast({
          title: "O'chirildi",
          description: "O'quvchi muvaffaqiyatli o'chirildi",
        });
      })
      .catch(() => {
        toast({
          title: "O'chirilmadi",
          description: "Xatolik",
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    students?.data
      ? setData(
          students.data.map((student: IStudent) => ({
            id: student.id,
            full_name: `${student.first_name} ${student.last_name}`,
            number: student.phone_number,
            direction: student.groups?.group_name,
            parent_full_name: student.parent_name,
            parent_number: student.parent_phone_number,
            age: student.age,
          }))
        )
      : "";
  }, [students]);

  return (
    <div className="mt-12 mb-16 px-11">
      <div className="flex justify-between items-center pl-10 pr-11 mb-8">
        <h3 className="text-[40px] leading-[48px] font-semibold text-[#0061F7]">Bizning o’quvchilar</h3>
        <Input
          className="max-w-[340px] bg-no-repeat search_input rounded-2xl bg-[url('/assets/icons/search.svg')] pl-12 focus-visible:ring-[#2F49D199]"
          onChange={(evt) => {
            setGlobalFilter(evt.target.value.trim());
          }}
        />
      </div>
      <Table className="block">
        <TableHeader className="block sticky top-0 bg-[#2F49D1] scrollbar-thumb-rounded scrollbar-track-rounded-full">
          {table.getHeaderGroups().map((headerCol) => (
            <TableRow className="student-table items-center justify-between hover:bg-[#2F49D1]" key={headerCol.id}>
              {headerCol.headers.map((header) => (
                <TableHead className={`flex items-center text-white`} key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        {isLoading ? (
          <tbody className="flex justify-content-center">
            <tr className="flex justify-center">
              <td className="text-center flex justify-center">Loading...</td>
            </tr>
          </tbody>
        ) : (
          <TableBody className="block max-h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-[#323232] scrollbar-track-[#C4C4C4]">
            {table.getRowModel().rows.map((row) => (
              <TableRow className="student-table even:hover:bg-[#001daf08] odd:hover:bg-[#001daf3b] odd:bg-[#001CAF1A]" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className={`${cell.id.includes("parent_number") ? "flex justify-between" : ""}`} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {cell.id.includes("parent_number") ? (
                      <div className="flex gap-5">
                        <DialogComponent
                          trigger={
                            <button
                              type="button"
                              onClick={() => {
                                form.setValue("first_name", row.original.full_name.split(" ").slice(0, 1).join());
                                form.setValue("last_name", row.original.full_name.split(" ").slice(1, 2).join());
                                form.setValue("phone_number", +row.original.number);
                                form.setValue("age", row.original.age ? +row.original.age : 0);
                                form.setValue("id", +row.original.id);
                              }}
                            >
                              <img src="/assets/icons/edit.svg" width={20} height={20} alt="Pen's icon" />
                            </button>
                          }
                        >
                          <div>
                            <h4 className="my-4 text-2xl font-bold text-orange-600">Tahrirlash</h4>
                            <p className="text-neutral-500 mb-6">
                              <strong className="text-black font-semibold">{row.original.full_name}</strong> o'quvchi ma'lumotlari
                            </p>
                            <Form {...form}>
                              <form onSubmit={form.handleSubmit((values) => onSubmit(values))} className="flex flex-wrap gap-8 justify-between items-end content-end">
                                <FormField
                                  control={form.control}
                                  name="first_name"
                                  render={({ field }) => (
                                    <FormItem className="w-[320px]">
                                      <FormLabel className="text-lg tracking-wide font-semibold">O’quvchi ismi</FormLabel>
                                      <FormControl>
                                        <Input className="focus-visible:ring-[#2F49D199]" type="text" placeholder="O’quvchi ismi ..." {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="phone_number"
                                  render={({ field }) => (
                                    <FormItem className="w-[320px]">
                                      <FormLabel className="text-lg tracking-wide font-semibold">Telefon raqam</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          className="focus-visible:ring-[#2F49D199]"
                                          placeholder="Telefon raqam ..."
                                          {...field}
                                          onChange={(evt) => {
                                            field.onChange(evt.target.value ? +evt.target.value : "");
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="last_name"
                                  render={({ field }) => (
                                    <FormItem className="w-[320px]">
                                      <FormLabel className="text-lg tracking-wide font-semibold">O’quvchi familyasi</FormLabel>
                                      <FormControl>
                                        <Input className="focus-visible:ring-[#2F49D199]" placeholder="Ota-onasi ismi ..." {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="age"
                                  render={({ field }) => (
                                    <FormItem className="w-[320px]">
                                      <FormLabel className="text-lg tracking-wide font-semibold">O’quvchi yoshi</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="number"
                                          className="focus-visible:ring-[#2F49D199]"
                                          placeholder="O’quvchi yoshi ..."
                                          {...field}
                                          onChange={(evt) => {
                                            field.onChange(evt.target.value ? +evt.target.value : "");
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button className="bg-orange-600 ml-auto hover:bg-orange-700 transition" type="submit" disabled={Boolean(Object.keys(form.formState.errors).length)}>
                                  Tahrirlash
                                </Button>
                              </form>
                            </Form>
                          </div>
                        </DialogComponent>

                        <DialogComponent
                          trigger={
                            <button type="button">
                              <img src="/assets/icons/garbage.svg" width={20} height={20} alt="Pen's icon" />
                            </button>
                          }
                        >
                          <div>
                            <h4 className="mt-4 mb-8 text-xl font-bold text-red-600">O'chirish</h4>
                            <p className="text-neutral-500">
                              <strong className="text-black font-semibold">{row.original.full_name}</strong> o'quvchilar ro'yxatidan o'chirishni istaysizmi ?
                            </p>
                            <form className="flex justify-end" onSubmit={(evt) => handleDeleteStudent(evt, row.original.id)}>
                              <DialogClose asChild>
                                <Button className="bg-red-500 hover:bg-red-600 transition" type="submit">
                                  O'chirish
                                </Button>
                              </DialogClose>
                            </form>
                          </div>
                        </DialogComponent>
                      </div>
                    ) : (
                      ""
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-20">
        <strong>Jami: {table.getPageCount()} ta</strong>
        <Pagination className="mx-0 inline-block w-auto ml-16 select-none">
          <PaginationContent className="inline-flex">
            <PaginationItem>
              <button className="bg-[#2F49D1] cursor-pointer p-2.5 rounded disabled:opacity-10" type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <img className="-rotate-180" src="/assets/icons/arrow.svg" width={24} height={24} alt="Arrow image" />
              </button>
            </PaginationItem>

            <MorePage pageIndex={pagination.pageIndex} countOfTable={table.getPageOptions} position="left" goToPage={table.setPageIndex} />

            <TwoPrevPage pageIndex={pagination.pageIndex} goToPage={table.setPageIndex} />

            {pagination.pageIndex + 1 ? <PaginationItem className="text-center border rounded-full border-slate-300 cursor-pointer min-w-[45px] p-2.5">{pagination.pageIndex + 1}</PaginationItem> : ""}

            <TwoNextPage pageIndex={pagination.pageIndex} countOfTable={table.getPageOptions} goToPage={table.setPageIndex} />

            <MorePage pageIndex={pagination.pageIndex} countOfTable={table.getPageOptions} position="right" goToPage={table.setPageIndex} />

            <PaginationItem>
              <button className="bg-[#2F49D1] cursor-pointer p-2.5 rounded disabled:opacity-10" type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <img src="/assets/icons/arrow.svg" width={24} height={24} alt="Arrow image" />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

const TwoNextPage = ({ pageIndex, countOfTable, goToPage }: { pageIndex: number; countOfTable: () => number[]; goToPage: (pageNum: number) => void }) => {
  if (countOfTable().includes(pageIndex + 2)) {
    return (
      <PaginationItem className="text-center border rounded-full hover:border-slate-300 cursor-pointer min-w-[45px] p-2.5" onClick={() => goToPage(pageIndex + 2)}>
        {pageIndex + 2}
      </PaginationItem>
    );
  } else if (countOfTable().includes(pageIndex + 1)) {
    return <PaginationItem className="text-center cursor-pointer min-w-[45px] p-2.5 rounded">{pageIndex + 2}</PaginationItem>;
  }
  return "";
};

const TwoPrevPage = ({ pageIndex, goToPage }: { pageIndex: number; goToPage: (pageNum: number) => void }) => {
  if (pageIndex > 0) {
    return (
      <PaginationItem className="text-center cursor-pointer min-w-[45px] p-2.5 border rounded-full hover:border-slate-300" onClick={() => goToPage(pageIndex - 1)}>
        {pageIndex}
      </PaginationItem>
    );
  }
  return "";
};

const MorePage = ({ pageIndex, countOfTable, position, goToPage }: { pageIndex: number; countOfTable: () => number[]; position: "right" | "left"; goToPage: (pageNum: number) => void }) => {
  if (position === "left") {
    if (pageIndex > 1) {
      return (
        <PaginationItem className="cursor-pointer inline-flex items-center justify-center h-[45px] w-[45px] border rounded-full hover:border-slate-300" onClick={() => goToPage(pageIndex - 2)}>
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
  }

  if (position === "right") {
    if (pageIndex + 2 < countOfTable().length) {
      return (
        <PaginationItem
          className="cursor-pointer inline-flex items-center justify-center h-[45px] w-[45px] border rounded-full hover:border-slate-300"
          onClick={() => goToPage(countOfTable().includes(pageIndex + 3) ? pageIndex + 3 : pageIndex + 2)}
        >
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
  }
};

export default StudentsTable;
