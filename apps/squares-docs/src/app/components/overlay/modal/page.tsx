'use client';

import React, { useState } from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { Button, Modal, ModalHeader } from '@cubik/ui';

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          { name: 'Modal', href: '/component/modal', current: true },
        ]}
        heading={'Modal'}
        description={`A modal dialogue is a window that is superimposed over main content and directs the user's attention only to that information.`}
      >
        <div className='flex flex-col gap-10'>
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { Modal } from "@cubik/ui"' />
          </div>
          <Button variant='secondary' sizeVariant='md' onClick={() => setOpen(true)}>Test Button</Button>
          <Modal
            dialogSize="md"
            onClose={() => setOpen(false)}
            open={open}
          >
            <ModalHeader heading='this is heading' headingSize='md' onClose={()=> setOpen(false)} />
            <div className="h-80 w-full bg-red-400"></div>
          </Modal>
     
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
             <CodeComponent codeString={` <Modal dialogSize="md"
      onClose={() => setOpen(false)}
            open={open}
          >
            <ModalHeader heading='this is heading' headingSize='md' onClose={()=> setOpen(false)} />
            <div className="h-80 w-full bg-red-400"></div>
          </Modal
          `}  />
          </div>
        </div>
      </PageHOC>
    </>
  );
};

export default Page;
