'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { HelperText, InputLabel, ToggleSwitch } from '@cubik/ui';

const SwitchPage = () => {
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          {
            name: 'Switch',
            href: '/component/switch',
            current: true,
          },
        ]}
        heading={'Switch'}
        description=""
      >
        <div>
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { HelperText, InputLabel, ToggleSwitch } from "@cubik/ui"' />
          </div>
          <div className="mt-8 flex flex-col gap-10">
            <ToggleSwitch size={'sm'}>
              <InputLabel fontSize={'sm'} isRequired={true}>
                hello world
              </InputLabel>
            </ToggleSwitch>

            <ToggleSwitch size={'md'}>
              <InputLabel fontSize={'md'} isRequired={true}>
                Label Text
              </InputLabel>
              <HelperText variant={'default'} fontSize={'md'}>
                Helper text
              </HelperText>
            </ToggleSwitch>

            <ToggleSwitch size={'sm'} variant={'extended'}>
              <InputLabel fontSize={'sm'} isRequired={true}>
                Label Text
              </InputLabel>
              <HelperText variant={'default'} fontSize={'sm'}>
                Helper text
              </HelperText>
            </ToggleSwitch>

            <ToggleSwitch size={'md'} variant={'extended'}>
              <InputLabel fontSize={'md'} isRequired={true}>
                Label Text
              </InputLabel>
              <HelperText variant={'default'} fontSize={'md'}>
                Helper text
              </HelperText>
            </ToggleSwitch>
          </div>
        </div>
      </PageHOC>
    </>
  );
};

export default SwitchPage;
