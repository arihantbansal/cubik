import React from 'react';

import PageHOC from '../../../home-page-components/components/pageHOC';

const page = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        { name: 'Tabs', href: '/component/tabs', current: true },
      ]}
      heading={'Tabs'}
      description={
        'Use the tabs component to display multiple panels of content.'
      }
    >
      <></>
    </PageHOC>
  );
};

export default page;
