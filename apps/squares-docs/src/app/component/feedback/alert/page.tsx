import React from 'react';

import PageHOC from '../../components/pageHOC';

const page = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        { name: 'Alert', href: '/component/alert', current: true },
      ]}
      heading={'Alert'}
      description={
        'Use the alert component to display important messages to users.'
      }
    >
      <></>
    </PageHOC>
  );
};

export default page;
