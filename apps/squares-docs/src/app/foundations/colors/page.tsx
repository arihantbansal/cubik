'use client';

import React from 'react';

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

import { serializeSemantic } from '../../../lib/colors';
import PageHOC from '../../home-page-components/components/pageHOC';

export default function ComponentPage() {
  const serialized = serializeSemantic();
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
      <Tabs size="md" defaultValue="bg">
        <TabList>
          <Tab value="bg">Background</Tab>
          <Tab value="surface">Surface</Tab>
          <Tab value="fg">Foregroud</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="bg">
            <Table className="dark:text-white">
              <TableCaption>A list of Background Colors</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Variation</TableHead>
                  <TableHead>Token Name</TableHead>
                  <TableHead>Dark Mode</TableHead>
                  <TableHead className="text-right">Light Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serialized.bg.map((v, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{v.variant}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.dark}</TableCell>
                    <TableCell className="text-right">{v.light}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabPanel>
          <TabPanel value="surface">
            <Table className="dark:text-white">
              <TableCaption>A list of Surface Colors</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Variation</TableHead>
                  <TableHead>Token Name</TableHead>
                  <TableHead>Dark Mode</TableHead>
                  <TableHead className="text-right">Light Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serialized.surface.map((v, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{v.variant}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.dark}</TableCell>
                    <TableCell className="text-right">{v.light}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabPanel>
          <Table className="dark:text-white">
            <TableCaption>A list of Background Colors</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Variation</TableHead>
                <TableHead>Token Name</TableHead>
                <TableHead>Dark Mode</TableHead>
                <TableHead className="text-right">Light Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serialized.bg.map((v, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{v.variant}</TableCell>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.dark}</TableCell>
                  <TableCell className="text-right">{v.light}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TabPanel value="fg">
            <Table className="dark:text-white">
              <TableCaption>A list of Foreground Colors</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Variation</TableHead>
                  <TableHead>Token Name</TableHead>
                  <TableHead>Dark Mode</TableHead>
                  <TableHead className="text-right">Light Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serialized.fg.map((v, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{v.variant}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.dark}</TableCell>
                    <TableCell className="text-right">{v.light}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </PageHOC>
  );
}
