'use client';

import React from 'react';

import { Tag } from '@cubik/ui';

// import BreadCrumb from '../../../home-page-components/components/BreadCrumb';
// import ComponentHeading from '../../../home-page-components/components/ComponentHeading';
import PageHOC from '../../../home-page-components/components/pageHOC';
import CodeComponent from '@/app/home-page-components/code-component';

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
      <Tag text="Pending" iconName="spinner" color="#000" />
      <CodeComponent codeString='<Tag text="Pending" iconName="spinner" color="#000" />'/>
    </PageHOC>
  );
};

export default Tags;
