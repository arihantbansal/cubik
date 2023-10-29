'use client';

import React from 'react';

import { Text, textVariants } from '@cubik/ui';

const page = () => {
  return (
    <div className="flex flex-col justify-start gap-5 px-10">
      <div className="font-2xl font-semibold">Texts</div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">Normal text</div>
        <Text fontSize={'xs'}>This is text</Text>
        <Text fontSize={'sm'}>This is text</Text>
        <Text fontSize={'md'}>This is text</Text>
        <Text fontSize={'lg'}>This is text</Text>
        <Text fontSize={'xl'}>This is text</Text>
        <Text fontSize={'2xl'}>This is text</Text>
        <Text fontSize={'3xl'}>This is text</Text>
        <Text fontSize={'4xl'}>This is text</Text>
        <Text fontSize={'5xl'}>This is text</Text>
        <Text fontSize={'6xl'}>This is text</Text>
      </div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">Truncated text</div>
        <Text fontSize={'md'} noOfLines={1}>
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          laboriosam dolores rerum illo velit rem facere eligendi laudantium
          ipsum recusandae, laborum est nulla inventore libero enim animi
          voluptatem ut nam?{' '}
        </Text>

        <Text fontSize={'md'} noOfLines={2}>
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          laboriosam dolores rerum illo velit rem facere eligendi laudantium
          ipsum recusandae, laborum est nulla inventore libero enim animi
          voluptatem ut nam?{' '}
        </Text>

        <Text fontSize={'md'} noOfLines={3}>
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          laboriosam dolores rerum illo velit rem facere eligendi laudantium
          ipsum recusandae, laborum est nulla inventore libero enim animi
          voluptatem ut nam. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Architecto laboriosam dolores rerum illo velit rem facere
          eligendi laudantium ipsum recusandae, laborum est nulla inventore
          libero enim animi voluptatem ut nam. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Architecto laboriosam dolores rerum illo
          velit rem facere eligendi laudantium ipsum recusandae, laborum est
          nulla inventore libero enim animi voluptatem ut nam. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Architecto laboriosam dolores
          rerum illo velit rem facere eligendi laudantium ipsum recusandae,
          laborum est nulla inventore libero enim animi voluptatem ut nam.
        </Text>
      </div>
    </div>
  );
};

export default page;
