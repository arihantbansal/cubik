'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { Input } from '@cubik/ui';

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
          <div className="flex flex-col gap-10">
            <Input
              isError={false}
              isHttps={true}
              rightElement={<p>https://</p>}
              size="md"
              leftElement={<p>https://</p>}
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <Input
              isError={true}
              isHttps={true}
              rightElement={<p>USD</p>}
              size="md"
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <Input
              isError={false}
              isHttps={true}
              size="md"
              leftElement={<p>https://</p>}
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <Input
              isError={false}
              isHttps={true}
              size="md"
              leftElement={<p>https://</p>}
              id="aa"
              name="aa"
              placeholder="test@cubik.com"
              type="text"
            />
            <Input
              isError={false}
              isHttps={true}
              isDisabled={true}
              rightElement={<p>USDC</p>}
              size="md"
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
