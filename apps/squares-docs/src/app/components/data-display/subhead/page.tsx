'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { Button, SubHead } from '@cubik/ui';

const SubHeadPage = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        {
          name: 'Input',
          href: '/component/subhead',
          current: true,
        },
      ]}
      heading={'Subhead'}
      description=""
    >
      <div>
        <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
          <CodeComponent codeString='import { SubHead } from "@cubik/ui"' />
        </div>
        <div className="mt-10">
          <SubHead
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M4.65 15.75C3.80992 15.75 3.38988 15.75 3.06901 15.5865C2.78677 15.4427 2.5573 15.2132 2.41349 14.931C2.25 14.6101 2.25 14.1901 2.25 13.35L2.25 12.9C2.25 12.0599 2.25 11.6399 2.41349 11.319C2.5573 11.0368 2.78677 10.8073 3.06901 10.6635C3.38988 10.5 3.80992 10.5 4.65 10.5L13.35 10.5C14.1901 10.5 14.6101 10.5 14.931 10.6635C15.2132 10.8073 15.4427 11.0368 15.5865 11.319C15.75 11.6399 15.75 12.0599 15.75 12.9V13.35C15.75 14.1901 15.75 14.6101 15.5865 14.931C15.4427 15.2132 15.2132 15.4427 14.931 15.5865C14.6101 15.75 14.1901 15.75 13.35 15.75H4.65Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.65 7.5C3.80992 7.5 3.38988 7.5 3.06901 7.33651C2.78677 7.1927 2.5573 6.96323 2.41349 6.68099C2.25 6.36012 2.25 5.94008 2.25 5.1L2.25 4.65C2.25 3.80992 2.25 3.38988 2.41349 3.06901C2.5573 2.78677 2.78677 2.5573 3.06901 2.41349C3.38988 2.25 3.80992 2.25 4.65 2.25L13.35 2.25C14.1901 2.25 14.6101 2.25 14.931 2.41349C15.2132 2.5573 15.4427 2.78677 15.5865 3.06901C15.75 3.38988 15.75 3.80992 15.75 4.65V5.1C15.75 5.94008 15.75 6.36012 15.5865 6.68098C15.4427 6.96323 15.2132 7.1927 14.931 7.33651C14.6101 7.5 14.1901 7.5 13.35 7.5L4.65 7.5Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            leftElement={
              <Button size="sm" variant="danger">
                Hello world
              </Button>
            }
            size="md"
            heading="heading"
            subheading="this is a subheading"
          />
        </div>
      </div>
    </PageHOC>
  );
};

export default SubHeadPage;
