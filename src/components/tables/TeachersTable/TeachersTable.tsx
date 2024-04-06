import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, PaginationState, getFilteredRowModel } from "@tanstack/react-table";
import { teachersColumn as columns } from "./columns";
import { ITeacher, ITeacherTable, IUpdateTeacher } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import DialogComponent from "@/components/shared/DialogComponent";
import { Input } from "@/components/ui/input";
import { BASE_URL, useEditTeacherMutation, useGetTeachersQuery, useRemoveTeacherMutation } from "@/lib/queries";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TeacherUpdateValidation } from "@/lib/validations";

const TeachersTable = () => {
  const { data: fetchedData, isLoading } = useGetTeachersQuery(undefined);

  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<ITeacherTable[]>(() => []);

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

  const form = useForm<z.infer<typeof TeacherUpdateValidation>>({
    resolver: zodResolver(TeacherUpdateValidation),
    mode: "all",
  });

  const [editTeacher] = useEditTeacherMutation();
  const [removeTeacher, result] = useRemoveTeacherMutation();

  const updateTeacher = async (values: IUpdateTeacher) => {
    try {
      await editTeacher(values).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  function onSubmit(values: z.infer<typeof TeacherUpdateValidation>) {
    updateTeacher(values);
  }

  // const deleteTeacher = async (id: number) => {
  //   await removeTeacher(id).unwrap();
  // };

  const handleDeleteStudent = async (evt: FormEvent, id: number) => {
    evt.preventDefault();
    console.log(result);
    await removeTeacher(id);
    axios.delete(`${BASE_URL}/delete/${id}`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    fetchedData
      ? setData(
          fetchedData?.data.map((data: ITeacher) => ({
            id: data.id,
            full_name: `${data.first_name} ${data.last_name}`,
            number: data.phone_number,
            direction: data.subjects.subject_name,
            age: data.age,
          }))
        )
      : "";
  }, [fetchedData]);

  return (
    <div className="mt-12 mb-16 px-11">
      <div className="flex justify-between items-center pl-10 pr-11 mb-8">
        <h3 className="text-[40px] leading-[48px] font-semibold text-[#0061F7]">Bizning o’qtuvchilar</h3>
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
            <TableRow className="teachers-table items-center justify-between hover:bg-[#2F49D1]" key={headerCol.id}>
              {headerCol.headers.map((header) => (
                <TableHead className={`flex items-center text-white`} key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={100} className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <TableBody className="block max-h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-[#323232] scrollbar-track-[#C4C4C4]">
            {table.getRowModel().rows.map((row) => (
              <TableRow className="teachers-table even:hover:bg-[#001daf08] odd:hover:bg-[#001daf3b] odd:bg-[#001CAF1A]" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className={`${cell.id.includes("age") ? "flex justify-between" : ""}`} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {cell.id.includes("age") ? (
                      <div className="flex gap-5">
                        <DialogComponent
                          trigger={
                            <button
                              type="button"
                              onClick={() => {
                                form.setValue("first_name", row.original.full_name.split(" ").slice(0, 1).join());
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
                                <FormField
                                  control={form.control}
                                  name="img"
                                  render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem className="w-[320px]">
                                      <FormLabel className="text-xl tracking-wide font-semibold">Rasm 3x4</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="file"
                                          className="focus-visible:ring-[#2F49D199]"
                                          placeholder="Rasm 3x4 ..."
                                          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                                            if (evt.target.files) {
                                              value;
                                              onChange(evt.target.files[0]);
                                            }
                                          }}
                                          {...fieldProps}
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
                            <p className="text-neutral-500 mb-6">
                              <strong className="text-black font-semibold">{row.original.full_name}</strong> o'qtuvchilar ro'yxatidan o'chirishni istaysizmi ?
                            </p>
                            <form className="flex justify-end" onSubmit={(evt) => handleDeleteStudent(evt, row.original.id)}>
                              <Button className="bg-red-500 hover:bg-red-600 transition" type="submit">
                                O'chirish
                              </Button>
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

export default TeachersTable;
