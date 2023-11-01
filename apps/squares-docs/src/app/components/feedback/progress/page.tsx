'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { Progress } from '@cubik/ui';

const ProgressPage = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        { name: 'Progress', href: '/component/progress', current: true },
      ]}
      heading={'Progress'}
      description={
        'When a task requires multiple steps or takes a lengthy time, the progress status is displayed using progress.'
      }
    >
      <div>
        <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
          <CodeComponent codeString='import { Progress } from "@cubik/ui"' />
        </div>
        <div className='mt-10'>
          <Progress defaultProgress={50} />
        </div>
      </div>
    </PageHOC>
  );
};

export default ProgressPage;
