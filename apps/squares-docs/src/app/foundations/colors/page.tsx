'use client';

import React from 'react';

import { serializeSemantic } from '@cubik/helper-scripts/src/color/serializeSemantic';
import {
  Tab,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@cubik/ui';

import PageHOC from '../../home-page-components/components/pageHOC';

type objectType = {
  name: string;
  value: objectType | objectType[];
};

export default function ComponentPage() {
  const serialized: objectType[] = serializeSemantic();

  return (
    <PageHOC
      pages={[
        { name: 'Foundations', href: '/foundations', current: false },
        { name: 'Colors', href: '/foundations/colors', current: true },
      ]}
      heading={'Colors'}
      description={
        'Our color tokens are a foundational part of our design system. We use color to visually communicate information, functions, and personality in our experiences.'
      }
    >
      <>
        {' '}
        {serialized.map((token, key) => (
          <div key={key}>
            <Tabs defaultValue="three" size="sm" className="">
              <TabList>
                {(token.value as objectType[]).map(
                  (tokenVariant: any, key: any) => (
                    <Tab key={key} value={tokenVariant.name}>
                      {tokenVariant.name}
                    </Tab>
                  ),
                )}
              </TabList>
              <TabPanels>
                {(token.value as objectType[]).map(
                  (tokenVariant: any, key: any) => (
                    <TabPanel key={key} value={tokenVariant.name}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Dark Mode</TableHead>
                            <TableHead>Light Mode</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tokenVariant.value.map(
                            (colorGroup: any, index: any) => (
                              <TableRow key={index}>
                                <TableCell className="">
                                  {colorGroup.name}
                                </TableCell>
                                <TableCell className="flex w-fit flex-col gap-4">
                                  {colorGroup.value.map(
                                    (color: any, index: any) => (
                                      <div key={index}>
                                        <div className="w-fit bg-yellow-200 ">
                                          --{color.name}
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </TableCell>
                                <TableCell>
                                  {colorGroup.value.map(
                                    (color: any, index: any) => (
                                      <div key={index}>
                                        <div>{color.lightValue}</div>
                                      </div>
                                    ),
                                  )}
                                </TableCell>
                                <TableCell>
                                  {colorGroup.value.map(
                                    (color: any, index: any) => (
                                      <div key={index}>{color.darkValue}</div>
                                    ),
                                  )}
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                      {/* {tokenVariant.value.map((colorGroup, index) => (
                    <div key={index}>
                      <div>{colorGroup.name}</div>
                      {colorGroup.value.map((color, index) => (
                        <div key={index}>
                          <div>--{color.name}</div>
                        </div>
                      ))}
                    </div>
                  ))} */}
                    </TabPanel>
                  ),
                )}
              </TabPanels>
            </Tabs>
          </div>
        ))}
      </>
    </PageHOC>
  );
}
