'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { HelperText, Input, InputLabel } from '@cubik/ui';

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
        <Input
          inputvariant="md"
          isError={false}
          InputLabel={
            <InputLabel maxCounterValue={100} counterValue={10} isRequired>
              Hello world
            </InputLabel>
          }
          helperText={
            <HelperText variant={'success'} fontSize={'md'}>
              hello
            </HelperText>
          }
        />
        <Input
          inputvariant="md"
          isError={true}
          InputLabel={
            <InputLabel maxCounterValue={100} counterValue={10} isRequired>
              Hello world
            </InputLabel>
          }
          helperText={
            <HelperText variant={'error'} fontSize={'md'}>
              hello
            </HelperText>
          }
        />
        <Input
          inputvariant="md"
          isError={true}
          leftElement={<>https://</>}
          InputLabel={<InputLabel isRequired>Hello world</InputLabel>}
          helperText={
            <HelperText variant={'error'} fontSize={'md'}>
              hello
            </HelperText>
          }
        />
        <Input
          inputvariant="md"
          isError={false}
          rightElement={<>USDC</>}
          InputLabel={
            <InputLabel maxCounterValue={100} counterValue={10} isRequired>
              Hello world
            </InputLabel>
          }
          helperText={
            <HelperText variant={'error'} fontSize={'md'}>
              hello
            </HelperText>
          }
        />
      </div>
    </PageHOC>
  );
};

export default InputPage;
