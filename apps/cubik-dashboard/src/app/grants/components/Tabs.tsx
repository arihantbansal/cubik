'use client';

import React from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@cubik/ui';

import { MultisigSection } from './sections/multisig-section/Multisigs';
import { RegistrationsSection } from './sections/registration-section/Registrations';

export const TabsSection = () => {
  return (
    <div className="mx-auto w-full  text-white">
      <Tabs size="sm" defaultValue="details">
        <TabList className="w-full  overflow-x-auto whitespace-nowrap bg-neutral-800">
          <div className="mx-auto flex w-full  max-w-7xl justify-start gap-4">
            <Tab value="details">Details</Tab>
            <Tab value="registrations">Registrations</Tab>
            <Tab value="multi">Multi</Tab>
            <Tab value="analytics">Analytics</Tab>
            <Tab value="settings">Settings</Tab>
          </div>
        </TabList>
        <TabPanels className="mx-auto w-full max-w-7xl">
          <TabPanel value="details">
            Make changes to your account here.
          </TabPanel>
          <TabPanel value="registrations">
            <RegistrationsSection />
          </TabPanel>
          <TabPanel value="multi">
            <MultisigSection />
          </TabPanel>
          <TabPanel value="analytics">Change your password here.</TabPanel>
          <TabPanel value="settings">Change your password here.</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
