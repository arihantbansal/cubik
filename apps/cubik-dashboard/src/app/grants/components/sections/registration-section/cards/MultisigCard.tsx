import React from "react";
import {
  Button,
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@cubik/ui";
import { SponsorsTable } from "../table/tables/SponsorsTable";
import { TransactionsTable } from "../table/tables/TransactionsTable";
import { PayoutsTable } from "../table/tables/PayoutsTable";

const MultisigCard = () => {
  return (
    <div className="bg-muted rounded-lg w-full">
      <div className="flex items-center justify-between border-b border-gray-700 p-4">
        <h3 className="text-lg font-semibold">Cubik Multisig</h3>
        <div>
          <Button variant={"ghost"} className="underline underline-offset-4">
            Open Multisig
          </Button>
          <Button
            variant={"ghost"}
            className="border border-neutral-800 space-x-1 "
          >
            <p>Add Funds</p>
            <Icon
              name="plus"
              fill="none"
              strokeWidth={1.5}
              height={14}
              width={14}
            />
          </Button>
        </div>
      </div>

      <div className="flex justify-between flex-col px-10 py-16">
        <p className="text-xs text-white mb-2">Matching Pool</p>
        <h3 className="flex font-mono items-end mb-1">
          <h6 className="text-sm">$</h6> 40,000
        </h3>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
          >
            <circle cx="3" cy="3" r="3" fill="#F53D6B" />
          </svg>
          <p className="text-[10px] opacity-60 font-mono ml-1">$</p>
          <p className="text-xs opacity-60 font-mono mr-1">10,000 </p>
          <p className="text-xs text-white opacity-60">Pending to add</p>
        </div>
      </div>

      <div className="">
        <Tabs defaultValue="sponsors" className="mt-6">
          <TabsList className="bg-neutral-800  w-full overflow-x-auto whitespace-nowrap">
            <div className="w-full max-w-7xl border-b border-b-surface-neutral-800 ">
              <TabsTrigger className="text-sm font-normal" value="sponsors">
                Sponsors
              </TabsTrigger>
              <TabsTrigger value="payout" className="text-sm font-normal">
                Payout
              </TabsTrigger>
              <TabsTrigger value="transactions" className="text-sm font-normal">
                Transactions
              </TabsTrigger>
            </div>
          </TabsList>
          <div className="w-full max-w-7xl mx-auto bg-[#1F1F1F] p-4 rounded-b-lg">
            <TabsContent value="sponsors">
              <>
                <SponsorsTable />
                <Button
                  variant={"ghost"}
                  size={"lg"}
                  className=" border-neutral-800 border w-full space-x-1 mt-4 "
                >
                  <p>Add a Sponsor</p>
                  <Icon
                    name="plus"
                    fill="none"
                    strokeWidth={1.5}
                    height={14}
                    width={14}
                  />
                </Button>
              </>
            </TabsContent>
            <TabsContent value="payout">
              <PayoutsTable />
            </TabsContent>
            <TabsContent value="transactions">
              <TransactionsTable />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default MultisigCard;
