'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { InputField } from '@cubik/ui';

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
            <InputField
              isError={false}
              isHttps={true}
              rightElement={<p>https://</p>}
              variant="md"
              leftElement={<p>https://</p>}
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <InputField
              isError={true}
              isHttps={true}
              rightElement={<p>USD</p>}
              variant="md"
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <InputField
              isError={false}
              isHttps={true}
              variant="md"
              leftElement={<p>https://</p>}
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <InputField
              isError={false}
              isHttps={true}
              variant="md"
              leftElement={<p>https://</p>}
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <InputField
              isError={false}
              isHttps={true}
              isDisabled={true}
              rightElement={<p>USDC</p>}
              variant="md"
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
          </div>
        </div>
      </PageHOC>
    </>
  );
};

export default InputPage;
