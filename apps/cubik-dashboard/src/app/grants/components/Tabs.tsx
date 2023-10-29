'use client';

import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@cubik/ui';

import { MultisigSection } from './sections/multisig-section/Multisigs';
import { RegistrationsSection } from './sections/registration-section/Registrations';

export const TabsSection = () => {
  return (
    <div className="mx-auto w-full  text-white">
      <Tabs defaultValue="details" className="">
        <TabsList className="w-full  overflow-x-auto whitespace-nowrap bg-neutral-800 ">
          <div className="mx-auto w-full max-w-7xl">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="multisigs">Multisigs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </div>
        </TabsList>
        <div className="mx-auto w-full max-w-7xl">
          <TabsContent value="details">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="registrations">
            <RegistrationsSection />
          </TabsContent>
          <TabsContent value="multisigs">
            <MultisigSection />
          </TabsContent>
          <TabsContent value="analytics">
            Change your password here.
          </TabsContent>
          <TabsContent value="settings">Change your password here.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
