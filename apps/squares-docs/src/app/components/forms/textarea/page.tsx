'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { InputLabel, Textarea } from '@cubik/ui';

const TextAreaPage = () => {
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          {
            name: 'Input',
            href: '/component/textarea',
            current: true,
          },
        ]}
        heading={'textarea'}
        description=""
      >
        <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
          <CodeComponent codeString='import { InputLabel } from "@cubik/ui"' />
        </div>
        <div className="flex flex-col gap-10">
          <Textarea
            size="md"
            state="default"
            resizable
            placeholder="Placeholder"
          />
          <Textarea
            size="md"
            state="hovered"
            resizable
            placeholder="Placeholder"
          />
          <Textarea
            size="md"
            state="focused"
            resizable
            placeholder="Placeholder"
          />
          <Textarea
            size="md"
            state="error"
            resizable
            placeholder="Placeholder"
          />
          <Textarea
            size="md"
            state="disabled"
            resizable
            placeholder="Placeholder"
          />
        </div>
      </PageHOC>
    </>
  );
};

export default TextAreaPage;
