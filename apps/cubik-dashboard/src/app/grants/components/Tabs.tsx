"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const TabsSection = () => {
  return (
    <div className="mx-auto w-full  text-white">
      <Tabs defaultValue="account" className="">
        <TabsList className="bg-neutral-800 w-full">
          <div className="w-full max-w-7xl">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="payout">Payout</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </div>
        </TabsList>
        <div className="w-full max-w-7xl mx-auto">
          <TabsContent value="details">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="registrations">
            Change your password here.
          </TabsContent>
          <TabsContent value="dashboard">
            Change your password here.
          </TabsContent>
          <TabsContent value="payout">Change your password here.</TabsContent>
          <TabsContent value="analytics">
            Change your password here.
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
