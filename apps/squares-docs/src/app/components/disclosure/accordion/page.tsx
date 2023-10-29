import React from 'react';

import PageHOC from '../../../home-page-components/components/pageHOC';

const page = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        { name: 'Accordion', href: '/component/accordion', current: true },
      ]}
      heading={'Accordion'}
      description={
        'Use the accordion component to display collapsible content.'
      }
    >
      <></>
    </PageHOC>
  );
};

export default page;
