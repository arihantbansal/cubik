'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { Checkbox } from '@cubik/ui';

const CheckboxPage = () => {
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          {
            name: 'Checkbox',
            href: '/component/checkbox',
            current: true,
          },
        ]}
        heading={'Checkbox'}
        description=""
      >
        <div>
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { InputField } from "@cubik/ui"' />
          </div>
          <div className="mt-8 flex flex-col gap-10">
            <Checkbox state={'default'} indetermined={false} />
            <Checkbox state={'hovered'} indetermined={false} />
            <Checkbox state={'focused'} indetermined={false} />
            <Checkbox state={'disabled'} indetermined={false} />

            <Checkbox state={'default'} indetermined={true} />
            <Checkbox state={'hovered'} indetermined={true} />
            <Checkbox state={'focused'} indetermined={true} />
            <Checkbox state={'disabled'} indetermined={true} />

            <Checkbox size="sm" state={'default'} indetermined={true} />
            <Checkbox size="sm" state={'hovered'} indetermined={true} />
            <Checkbox size="sm" state={'focused'} indetermined={true} />
            <Checkbox size="sm" state={'disabled'} indetermined={true} />
          </div>
        </div>
      </PageHOC>
    </>
  );
};

export default CheckboxPage;
