'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';
import { Input } from "@cubik/ui"

const InputPage = () => {
  return (
    <>
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
        <div>
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { Input } from "@cubik/ui"' />
          </div>
          <Input leftIcon={
            <p>https://</p>
          } 
          id='aa' name='aa' placeholder='test@cubik.com' type='text'  />
        </div>
      </PageHOC>
    </>
  );
};

export default InputPage;
