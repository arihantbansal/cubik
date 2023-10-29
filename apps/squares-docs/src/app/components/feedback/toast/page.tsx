"use client"

import React from 'react';

import PageHOC from '../../../home-page-components/components/pageHOC';


const ToastPage = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        { name: 'Toast', href: '/component/toast', current: true },
      ]}
      heading={'Toast'}
      description={
        'Use the toast component to display important messages to users.'
      }
    >x
    </PageHOC>
  );
};

export default ToastPage;
