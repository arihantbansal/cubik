import { TableCell, TableRow } from "@cubik/ui";
import React from "react";

export const TableRows = () => {
  return (
    <>
      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium pl-10">
          <div className="flex justify-start items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-red-500" />
            <div className="flex flex-col justify-start items-start">
              <p className="text-white text-base">Superteam Earn</p>
              <p className="text-surface-neutral-500 text-sm">
                earn@superteam.fun
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="text-surface-blue-500 text-sm font-medium underline underline-offset-4">
            earn.superteam.fun
          </p>
        </TableCell>
        <TableCell>
          <div className="flex gap-2 justify-start items-center">
            <div className="w-5 h-5 bg-red-600 rounded-full" />
            <p className="text-white text-base font-semibold">@dhruv</p>
          </div>
        </TableCell>
        <TableCell className="">
          <button className="text-white font-normal px-8 py-1 text-sm bg-violet-700 rounded-full">
            pending
          </button>
        </TableCell>
        <TableCell className="text-white font-medium text-sm">
          1 day ago
        </TableCell>
      </TableRow>
    </>
  );
};
