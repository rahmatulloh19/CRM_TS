import { useState } from "react";
import MOCKDATA from "./MOCK_DATA (1).json";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, PaginationState } from "@tanstack/react-table";
import { subjectsColumn as columns } from "./columns";
import { ISubjectTable } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from "@/components/ui/pagination";
import DialogComponent from "@/components/shared/DialogComponent";

const SubjectsTable = () => {
  const [data, setData] = useState<ISubjectTable[]>(() => [...MOCKDATA]);

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
    },
  });

  setData;

  return (
    <div className="mt-12 mb-16 px-11">
      <div className="flex pl-10 pr-11 mb-8">
        <h3 className="text-[40px] leading-[48px] font-semibold text-[#0061F7]">Bizning o’quvchilar</h3>
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
          {table.getRowModel().rows.map((row) => (
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
                        <h1>Hi I'm Dialog</h1>
                      </DialogComponent>

                      <DialogComponent
                        trigger={
                          <button type="button">
                            <img src="/assets/icons/garbage.svg" width={20} height={20} alt="Pen's icon" />
                          </button>
                        }
                      >
                        <h1>Hi I'm Delete Dialog</h1>
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
