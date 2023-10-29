'use client';

import React from 'react';

import { InputLabel } from '@cubik/ui';

const InputLabels = () => {
  return (
    <div className="flex flex-col justify-start gap-5 px-10">
      <div className="font-2xl font-semibold">Input Label</div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">Normal Input Field</div>
        <InputLabel variant={'error'}>Username</InputLabel>
        <InputLabel variant={'icon'}>Username</InputLabel>
        <InputLabel variant={'default'}>Username</InputLabel>
      </div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">Size Input Field</div>
        <InputLabel fontSize={'xs'}>Username</InputLabel>
        <InputLabel fontSize={'sm'}>Username</InputLabel>
        <InputLabel fontSize={'md'}>Username</InputLabel>
        <InputLabel fontSize={'lg'}>Username</InputLabel>
        <InputLabel fontSize={'xl'}>Username</InputLabel>
      </div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">FontWeight Input Field</div>
        <InputLabel fontWeight={'light'}>Username</InputLabel>
        <InputLabel fontWeight={'regular'}>Username</InputLabel>
        <InputLabel fontWeight={'medium'}>Username</InputLabel>
        <InputLabel fontWeight={'bold'}>Username</InputLabel>
      </div>
    </div>
  );
};

export default InputLabels;
