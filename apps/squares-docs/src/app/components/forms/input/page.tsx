'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import {
  HelperText,
  InputContainer,
  InputField,
  InputFieldContainer,
  InputLabel,
  InputLeftElement,
  InputRightElement,
} from '@cubik/ui';

const InputPage = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        {
          name: 'Input',
          href: '/component/input',
          current: true,
        },
      ]}
      heading={'Input'}
      description=""
    >
      <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
        <CodeComponent codeString='import { Input } from "@cubik/ui"' />
      </div>
      <div className="flex flex-col gap-10">
        <InputContainer>
          <InputLabel maxCounterValue={100} counterValue={10} isRequired>
            Hello world
          </InputLabel>
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
          <HelperText variant={'success'} fontSize={'md'}>
            hello
          </HelperText>
        </InputContainer>
      <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
        <CodeComponent codeString={` <InputContainer>
          <InputLabel maxCounterValue={100} counterValue={10} isRequired>
            Hello world
          </InputLabel>
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
          <HelperText variant={'success'} fontSize={'md'}>
            hello
          </HelperText>
        </InputContainer>`} />
      </div>
      </div>
    </PageHOC>
  );
};

export default InputPage;
