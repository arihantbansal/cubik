'use client';

import React, { useState } from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { Drawer } from '@cubik/ui';

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          { name: 'Drawer', href: '/component/drawer', current: true },
        ]}
        heading={'Drawer'}
        description=""
      >
        <div>
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { Drawer } from "@cubik/ui"' />
          </div>
          <button onClick={()=> setOpen(true)}>Test Button</button>
          <Drawer onClose={() => setOpen(false)} open={open}>
            <div className='h-80 w-full bg-red-400'></div>
          </Drawer>
        </div>
      </PageHOC>
    </>
  );
};

export default Page;
