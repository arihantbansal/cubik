'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';

import { Tag } from '@cubik/ui';

import PageHOC from '../../../home-page-components/components/pageHOC';

const Tags = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        { name: 'Tags', href: '/component/tags', current: true },
      ]}
      heading={'Tags'}
      description={
        'Use the label component to add contextual metadata to a design.'
      }
    >
      <div>
        <div>
          <CodeComponent codeString='import { Tag } from "@cubik/ui' />
        </div>
        <div className="mt-10">
          <Tag size="lg" variant="solid-blue">
            hello world
          </Tag>
        </div>
      </div>
    </PageHOC>
  );
};

export default Tags;
