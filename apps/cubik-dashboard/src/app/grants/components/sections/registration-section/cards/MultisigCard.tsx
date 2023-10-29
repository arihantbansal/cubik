import React from 'react';

import {
  Button,
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@cubik/ui';

import { PayoutsTable } from '../table/tables/PayoutsTable';
import { SponsorsTable } from '../table/tables/SponsorsTable';
import { TransactionsTable } from '../table/tables/TransactionsTable';

const MultisigCard = () => {
  return (
    <div className="bg-muted w-full rounded-lg">
      <div className="flex items-center justify-between border-b border-gray-700 p-4">
        <h3 className="text-lg font-semibold">Cubik Multisig</h3>
        <div>
          <Button variant={'ghost'} className="underline underline-offset-4">
            Open Multisig
          </Button>
          <Button
            variant={'ghost'}
            className="space-x-1 border border-neutral-800 "
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

      <div className="flex flex-col justify-between px-10 py-16">
        <p className="mb-2 text-xs text-white">Matching Pool</p>
        <h3 className="mb-1 flex items-end font-mono">
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
          <p className="ml-1 font-mono text-[10px] opacity-60">$</p>
          <p className="mr-1 font-mono text-xs opacity-60">10,000 </p>
          <p className="text-xs text-white opacity-60">Pending to add</p>
        </div>
      </div>

      <div className="">
        <Tabs defaultValue="sponsors" className="mt-6">
          <TabsList className="w-full  overflow-x-auto whitespace-nowrap bg-neutral-800">
            <div className="border-b-surface-neutral-800 w-full max-w-7xl border-b ">
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
          <div className="mx-auto w-full max-w-7xl rounded-b-lg bg-[#1F1F1F] p-4">
            <TabsContent value="sponsors">
              <>
                <SponsorsTable />
                <Button
                  variant={'ghost'}
                  size={'lg'}
                  className=" mt-4 w-full space-x-1 border border-neutral-800 "
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
