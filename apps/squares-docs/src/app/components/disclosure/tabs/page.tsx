'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@cubik/ui';

import PageHOC from '../../../home-page-components/components/pageHOC';

const page = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        { name: 'Tabs', href: '/component/tabs', current: true },
      ]}
      heading={'Tabs'}
      description={
        'Use the tabs component to display multiple panels of content.'
      }
    >
      <div className="">
        <CodeComponent codeString='import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@cubik/ui";' />
        <div className="mt-8">
          <Tabs defaultValue="three" size="xxs" className="">
            <TabList>
              <Tab value="one">
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value="two">
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value="three">
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="one">
                <p>one!</p>
              </TabPanel>
              <TabPanel value="two">
                <p>two!</p>
              </TabPanel>
              <TabPanel value="three">
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue="three" size="xs">
            <TabList>
              <Tab value="one">
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value="two">
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value="three">
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="one">
                <p>one!</p>
              </TabPanel>
              <TabPanel value="two">
                <p>two!</p>
              </TabPanel>
              <TabPanel value="three">
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue="three" size="sm">
            <TabList>
              <Tab value="one">
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value="two">
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value="three">
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="one">
                <p>one!</p>
              </TabPanel>
              <TabPanel value="two">
                <p>two!</p>
              </TabPanel>
              <TabPanel value="three">
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue="three" size="md">
            <TabList>
              <Tab value="one">
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value="two">
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value="three">
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="one">
                <p>one!</p>
              </TabPanel>
              <TabPanel value="two">
                <p>two!</p>
              </TabPanel>
              <TabPanel value="three">
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Tabs defaultValue="three" size="lg">
            <TabList>
              <Tab value="one">
                <div className="p-2">TabItem1</div>
              </Tab>
              <Tab value="two">
                {' '}
                <div className="p-2">TabItem2</div>
              </Tab>
              <Tab value="three">
                {' '}
                <div className="p-2">Tabitem3</div>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="one">
                <p>one!</p>
              </TabPanel>
              <TabPanel value="two">
                <p>two!</p>
              </TabPanel>
              <TabPanel value="three">
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </PageHOC>
  );
};

export default page;
