'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { Button } from '@cubik/ui';

const ButtonPage = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        {
          name: 'Input',
          href: '/component/button',
          current: true,
        },
      ]}
      heading={'Button'}
      description=""
    >
      <div>
        <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
          <CodeComponent codeString='import { Button } from "@cubik/ui"' />
        </div>
        <div className="flex justify-center gap-20">
          <div className="flex w-fit flex-col justify-start gap-10">
            <Button sizeVariant="xs" variant="primary">
              Hello World
            </Button>
            <Button sizeVariant="xs" variant="secondary">
              Hello World
            </Button>
            <Button sizeVariant="xs" variant="outline">
              Hello World
            </Button>
            <Button sizeVariant="xs" variant="link">
              Hello World
            </Button>
            <Button sizeVariant="xs" variant="danger">
              Hello World
            </Button>
            <Button sizeVariant="xs" variant="success">
              Hello World
            </Button>
          </div>
          <div className="flex w-fit flex-col justify-start gap-10">
            <Button sizeVariant="sm" variant="primary">
              Hello World
            </Button>
            <Button sizeVariant="sm" variant="secondary">
              Hello World
            </Button>
            <Button sizeVariant="sm" variant="outline">
              Hello World
            </Button>
            <Button sizeVariant="sm" variant="link">
              Hello World
            </Button>
            <Button sizeVariant="sm" variant="danger">
              Hello World
            </Button>
            <Button sizeVariant="sm" variant="success">
              Hello World
            </Button>
          </div>
          <div className="flex w-fit flex-col justify-start gap-10">
            <Button sizeVariant="md" variant="primary">
              Hello World
            </Button>
            <Button sizeVariant="md" variant="secondary">
              Hello World
            </Button>
            <Button sizeVariant="md" variant="outline">
              Hello World
            </Button>
            <Button sizeVariant="md" variant="link">
              Hello World
            </Button>
            <Button sizeVariant="md" variant="danger">
              Hello World
            </Button>
            <Button sizeVariant="md" variant="success">
              Hello World
            </Button>
          </div>
        </div>
      </div>
    </PageHOC>
  );
};

export default ButtonPage;
