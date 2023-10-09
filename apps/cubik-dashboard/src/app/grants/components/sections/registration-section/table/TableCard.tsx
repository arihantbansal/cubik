import { Tabs, TabsContent, TabsList, TabsTrigger } from "@cubik/ui";
import React from "react";
import { PendingTable } from "./tables/PendingTable";

export const TableCard = () => {
  return (
    <>
      <div className="px-3">
        <div className="bg-neutral-800 w-full rounded-md">
          <div className="p-5 border-b border-b-surface-neutral-800">
            <p className="text-white text-2xl font-semibold">Projects</p>
          </div>
          <div className="h-20 flex justify-start gap-4 md:gap-20 py-5 px-10">
            <div className="font-normal flex justify-start items-start flex-col gap-3 text-surface-neutral-600">
              <p className="text-xl font-semibold ">
                <span className="text-3xl font-extrabold text-white">29</span>
                /50
              </p>
              <p className="text-xs">Projects Participating</p>
            </div>
            <div className="font-normal flex justify-start items-start flex-col gap-3 text-surface-neutral-600">
              <p className="text-xl font-semibold ">
                <span className="text-3xl font-extrabold text-white">129</span>
              </p>
              <p className="text-xs">Projects Applied</p>
            </div>
            <div className="font-normal flex justify-start items-start flex-col gap-3 text-surface-neutral-600">
              <p className="text-xl font-semibold ">
                <span className="text-3xl font-extrabold text-white">
                  12 hrs
                </span>
              </p>
              <p className="text-xs">Till registration closes</p>
            </div>
          </div>
          <div>
            <Tabs defaultValue="pending" className="my-6">
              <TabsList className="bg-neutral-800 w-full overflow-x-auto whitespace-nowrap">
                <div className="w-full max-w-7xl border-b border-b-surface-neutral-800 px-10">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  <TabsTrigger value="accepted">Accepted</TabsTrigger>
                </div>
              </TabsList>
              <div className="w-full max-w-7xl mx-auto ">
                <TabsContent value="pending">
                  <PendingTable />
                </TabsContent>
                <TabsContent value="rejected">
                  Change your password here.
                </TabsContent>
                <TabsContent value="accepted">
                  Change your password here.
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
