"use client"
import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { Popover } from '@cubik/ui';

const PopOverPage = () => {
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          { name: 'Popover', href: '/component/popover', current: true },
        ]}
        heading={'Popover'}
        description={`A non-modal dialogue called Popover hovers above a trigger.`}
      >
        <div>
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { Popover } from "@cubik/ui"' />
          </div>
          <div className="mt-10">
            <Popover> 
                <div className='h-40 w-full bg-red-400'></div>
            </Popover>
          </div>
        </div>
      </PageHOC>
    </>
  );
};

export default PopOverPage;
