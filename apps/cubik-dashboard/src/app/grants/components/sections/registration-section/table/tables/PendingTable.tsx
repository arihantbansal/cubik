import { Table, TableHeader, TableRow, TableHead, TableBody } from "@cubik/ui";
import React from "react";
import { TableRows } from "./TableRow";
export const PendingTable = () => {
  return (
    <>
      <Table className="mt-5 ">
        <TableHeader>
          <TableRow className="text-base">
            <TableHead className="pl-10">Project</TableHead>
            <TableHead>Project Link</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRows />
        </TableBody>
      </Table>
    </>
  );
};
