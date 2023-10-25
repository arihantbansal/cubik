import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Button,
} from "@cubik/ui";
import React from "react";
import { TransactionsTableRows } from "./TransactionsTableRows";
import { PayoutsTableRows } from "./PayoutsTableRows";
export const PayoutsTable = () => {
  return (
    <>
      <Table className="">
        <TableHeader className="border-b-0">
          <TableRow className="text-base">
            <TableHead className="text-xs font-normal">Projects</TableHead>
            <TableHead className="text-xs font-normal">Percentage</TableHead>
            <TableHead className="text-xs font-normal">Amount</TableHead>
            <TableHead className="text-xs font-normal">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <PayoutsTableRows />
        </TableBody>
      </Table>
    </>
  );
};
