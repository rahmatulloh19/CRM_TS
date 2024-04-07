import { FormEvent, useEffect, useRef, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, PaginationState, getFilteredRowModel } from "@tanstack/react-table";
import { subjectsColumn as columns } from "./columns";
import { ISubjectTable } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import DialogComponent from "@/components/shared/DialogComponent";
import { Input } from "@/components/ui/input";
import { useEditSubjectMutation, useGetSubjectsQuery, useRemoveSubjectMutation } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";

const SubjectsTable = () => {
  const { toast } = useToast();

  const { data: fetchedData, isLoading } = useGetSubjectsQuery(undefined);

  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<ISubjectTable[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const [editSubject] = useEditSubjectMutation();

  const onSubmit = async (evt: FormEvent, id: number) => {
    evt.preventDefault();
    editSubject({ id, subject_name: inputRef.current?.value })
      .then(() => {
        toast({
          title: "Muvaffaqiyatli",
          description: "Muvaffaqiyatli tahrirlandi",
        });

        if (inputRef.current !== null && inputRef.current !== undefined) {
          inputRef.current.value = "";
        }
      })
      .catch(() => {
        toast({
          title: "Muvaffaqiyatsiz",
          description: "Xatolik",
          variant: "destructive",
        });
      });
  };

  const [removeSubject] = useRemoveSubjectMutation();

  const handleDelete = async (evt: FormEvent, id: number) => {
    evt.preventDefault();
    await removeSubject(id)
      .then(() => {
        toast({
          title: "Muvaffaqiyatli",
          description: "Muvaffaqiyatli o'chirildi",
        });
      })
      .catch(() => {
        toast({
          title: "Muvaffaqiyatsiz",
          description: "Xatolik",
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    fetchedData?.data ? setData(fetchedData.data) : "";
  }, [fetchedData]);

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
            <TableRow className="flex items-center justify-between hover:bg-[#2F49D1]" key={headerCol.id}>
              {headerCol.headers.map((header) => (
                <TableHead className={`flex items-center text-white ${header.column.columnDef.header === "Fan nomi" ? "grow" : ""}`} key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="block max-h-[500px] overflow-y-scroll scrollbar scrollbar-thumb-[#323232] scrollbar-track-[#C4C4C4]">
          {isLoading ? (
            <TableRow className="flex justify-center">
              <td className="block w-full">
                <Loader className="mx-auto" width={40} height={40} />
              </td>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="flex even:hover:bg-[#001daf08] odd:hover:bg-[#001daf3b] odd:bg-[#001CAF1A]" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="min-w-12 even:grow flex justify-between" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {!Number(cell.getValue()) ? (
                      <div className="flex gap-5">
                        <DialogComponent
                          trigger={
                            <button type="button">
                              <img src="/assets/icons/edit.svg" width={20} height={20} alt="Pen's icon" />
                            </button>
                          }
                        >
                          <div>
                            <h4 className="my-4 text-2xl font-bold text-orange-600">Tahrirlash</h4>
                            <p className="text-neutral-500 mb-6">
                              <strong className="text-black font-semibold">{row.original.subject_name}</strong> fanning ma'lumotlari
                            </p>
                            <form onSubmit={(evt) => onSubmit(evt, row.original.id)} className="flex flex-wrap gap-8 justify-end">
                              <input
                                className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 focus-visible:ring-[#2F49D199]"
                                type="text"
                                name="subject_name"
                                defaultValue={row.original.subject_name}
                                ref={inputRef}
                              />
                              <Button className="bg-orange-600 ml-auto hover:bg-orange-700 transition" type="submit">
                                Tahrirlash
                              </Button>
                            </form>
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
                            <p className="text-neutral-500 mb-5">
                              <strong className="text-black font-semibold">{row.original.subject_name}</strong> fanlar ro'yxatidan o'chirishni istaysizmi ?
                            </p>
                            <form className="flex justify-end" onSubmit={(evt) => handleDelete(evt, row.original.id)}>
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
            ))
          ) : (
            <TableRow className="flex justify-center">
              <td className="block w-full text-center text-lg mt-4">Fanlar yo'q</td>
            </TableRow>
          )}
        </TableBody>
      </Table>
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

export default SubjectsTable;
