import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Button,
} from "@cubik/ui";
import React from "react";
import { SponsorsTableRows } from "./SponsorsTableRows";
export const SponsorsTable = () => {
  return (
    <>
      <Table className="">
        <TableHeader className="border-b-0">
          <TableRow className="text-base">
            <TableHead className="text-xs font-normal">Sponsor</TableHead>
            <TableHead className="text-xs font-normal">Amount</TableHead>
            <TableHead className="text-xs font-normal">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <SponsorsTableRows />
        </TableBody>
      </Table>
    </>
  );
};
