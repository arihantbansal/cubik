'use client';

import React, { useState } from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import {
  InputFieldContainer,
  InputField,
  InputLeftElement,
  InputRightElement,
} from '@cubik/ui';

const InputPage = () => {
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          {
            name: 'InputField',
            href: '/component/inputfield',
            current: true,
          },
        ]}
        heading={'InputField'}
        description=""
      >
        <div>
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { InputField } from "@cubik/ui"' />
          </div>
          <div className="flex flex-col gap-10">
            <InputFieldContainer isDisabled={false} variant="md">
              <InputLeftElement withBorder={true}>https</InputLeftElement>
              <InputField
                id="aa"
                name="aa"
                placeholder="test@cubik.com"
                type="text"
              />
              <InputRightElement>https</InputRightElement>
            </InputFieldContainer>
          </div>
        </div>
      </PageHOC>
    </>
  );
};

export default InputPage;
