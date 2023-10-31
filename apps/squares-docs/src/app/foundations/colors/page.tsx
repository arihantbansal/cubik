"use client";
import React from 'react';
import PageHOC from '../../home-page-components/components/pageHOC';
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Table } from '@cubik/ui';
import { serializeSemantic } from '../../../lib/colors';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@cubik/ui';

export default function ComponentPage() {
  const serialized = serializeSemantic();
  return <PageHOC
    pages={[
      { name: 'Foundations', href: '/foundations', current: false },
      { name: 'Colors', href: '/foundations/colors', current: true },
    ]}
    heading={'Colors'}
    description={
      'Our color tokens are a foundational part of our design system. We use color to visually communicate information, functions, and personality in our experiences.'
    }
  >
    <Tabs defaultValue="bg">
      <TabsList>
        <TabsTrigger value="bg">Background</TabsTrigger>
        <TabsTrigger value="surface">Surface</TabsTrigger>
        <TabsTrigger value='fg'>Foregroud</TabsTrigger>
      </TabsList>
      <TabsContent value="bg">
        <Table className='dark:text-white'>
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
      </TabsContent>
      <TabsContent value="surface">
        <Table className='dark:text-white'>
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
      </TabsContent>
      <Table className='dark:text-white'>
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
      <TabsContent value='fg'>
      <Table className='dark:text-white'>
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
      </TabsContent>
    </Tabs>
  </PageHOC>;
}
