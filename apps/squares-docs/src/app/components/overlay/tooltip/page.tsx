'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { Tooltip } from '@cubik/ui';

const TooltipPage = () => {
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          { name: 'Tooltip', href: '/component/tooltip', current: true },
        ]}
        heading={'Tooltip'}
        description={`An instructive, concise message that shows up when a user interacts with an element is called a tooltip.`}
      >
        <div>
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { Tooltip } from "@cubik/ui"' />
          </div>
          <div className="mt-10">
            <Tooltip
              trigger={
                <button className="text-violet11 shadow-blackA4 hover:bg-violet3 inline-flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">
                  X
                </button>
              }
            >
              <h1>asdf</h1>
            </Tooltip>
          </div>
        </div>
      </PageHOC>
    </>
  );
};

export default TooltipPage;
