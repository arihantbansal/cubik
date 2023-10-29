'use client';

import React from 'react';

import { InputField } from '@cubik/ui';

const Input = () => {
  return (
    <div className="flex flex-col justify-start gap-5 px-10">
      <div className="font-2xl font-semibold">Input Field</div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">Normal Input Field</div>
        <InputField inputSize={'sm'} />
        <InputField inputSize={'md'} />
      </div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">Placeholder Input Field</div>
        <InputField inputSize={'sm'} placeholderVariant placeholder="input" />
        <InputField inputSize={'md'} placeholderVariant placeholder="input" />
      </div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">
          Placeholder left element Input Field
        </div>
        <InputField
          inputSize={'sm'}
          placeholderVariant
          placeholder="input"
          leftElement
          leftElementContent="USDC"
        />
        <InputField
          inputSize={'md'}
          placeholderVariant
          placeholder="input"
          leftElement
          leftElementContent="USDC"
        />
      </div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">
          Placeholder right element Input Field
        </div>
        <InputField
          inputSize={'sm'}
          placeholderVariant
          placeholder="input"
          rightElement
        />
        <InputField
          inputSize={'md'}
          placeholderVariant
          placeholder="input"
          rightElement
        />
      </div>

      <div className="space-y-2">
        <div className="font-lg font-semibold">
          Placeholder right and left element Input Field
        </div>
        <InputField
          inputSize={'sm'}
          placeholderVariant
          placeholder="input"
          leftElement
          rightElement
          leftElementContent="USDC"
        />
        <InputField
          inputSize={'md'}
          placeholderVariant
          placeholder="input"
          leftElement
          rightElement
          leftElementContent="USDC"
        />
      </div>
    </div>
  );
};

export default Input;
