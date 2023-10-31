'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import {
  Segment,
  SegmentContainer,
  SegmentContent,
  SegmentList,
  SegmentTrigger,
} from '@cubik/ui';

const Page = () => {
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          {
            name: 'Segment Control',
            href: '/component/segment',
            current: true,
          },
        ]}
        heading={'Segment Control'}
        description=""
      >
        <div>
          <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
            <CodeComponent codeString='import { Segment } from "@cubik/ui"' />
          </div>
          <div className="mt-10 flex w-full flex-col gap-5">
            <SegmentContainer size='sm'>
              <Segment defaultValue="account">
                <SegmentList position="end">
                  <SegmentTrigger value="account">Account</SegmentTrigger>
                  <SegmentTrigger value="account1">Account</SegmentTrigger>
                  <SegmentTrigger value="account2">Account</SegmentTrigger>
                  <SegmentTrigger value="account3">Account</SegmentTrigger>
                  <SegmentTrigger value="password">Password</SegmentTrigger>
                </SegmentList>
                {/* <SegmentContent value="account">
                  Make changes to your account here.
                </SegmentContent>
                <SegmentContent value="password">
                  Change your password here.
                </SegmentContent> */}
              </Segment>
            </SegmentContainer>
            <SegmentContainer size='md'>
              <Segment defaultValue="account">
                <SegmentList position="end">
                  <SegmentTrigger value="account">Account</SegmentTrigger>
                  <SegmentTrigger value="account1">Account</SegmentTrigger>
                  <SegmentTrigger value="account2">Account</SegmentTrigger>
                  <SegmentTrigger value="account3">Account</SegmentTrigger>
                  <SegmentTrigger value="password">Password</SegmentTrigger>
                </SegmentList>
                {/* <SegmentContent value="account">
                  Make changes to your account here.
                </SegmentContent>
                <SegmentContent value="password">
                  Change your password here.
                </SegmentContent> */}
              </Segment>
            </SegmentContainer>
            <SegmentContainer size='lg'>
              <Segment defaultValue="account">
                <SegmentList position="end">
                  <SegmentTrigger value="account">Account</SegmentTrigger>
                  <SegmentTrigger value="account1">Account</SegmentTrigger>
                  <SegmentTrigger value="account2">Account</SegmentTrigger>
                  <SegmentTrigger value="account3">Account</SegmentTrigger>
                  <SegmentTrigger value="password">Password</SegmentTrigger>
                </SegmentList>
                {/* <SegmentContent value="account">
                  Make changes to your account here.
                </SegmentContent>
                <SegmentContent value="password">
                  Change your password here.
                </SegmentContent> */}
              </Segment>
            </SegmentContainer>
            <SegmentContainer size='xl'>
              <Segment defaultValue="account">
                <SegmentList position="end">
                  <SegmentTrigger value="account">Account</SegmentTrigger>
                  <SegmentTrigger value="account1">Account</SegmentTrigger>
                  <SegmentTrigger value="account2">Account</SegmentTrigger>
                  <SegmentTrigger value="account3">Account</SegmentTrigger>
                  <SegmentTrigger value="password">Password</SegmentTrigger>
                </SegmentList>
                {/* <SegmentContent value="account">
                  Make changes to your account here.
                </SegmentContent>
                <SegmentContent value="password">
                  Change your password here.
                </SegmentContent> */}
              </Segment>
            </SegmentContainer>
            <SegmentContainer size='2xl'>
              <Segment defaultValue="account">
                <SegmentList position="end">
                  <SegmentTrigger value="account">Account</SegmentTrigger>
                  <SegmentTrigger value="account1">Account</SegmentTrigger>
                  <SegmentTrigger value="account2">Account</SegmentTrigger>
                  <SegmentTrigger value="account3">Account</SegmentTrigger>
                  <SegmentTrigger value="password">Password</SegmentTrigger>
                </SegmentList>
                {/* <SegmentContent value="account">
                  Make changes to your account here.
                </SegmentContent>
                <SegmentContent value="password">
                  Change your password here.
                </SegmentContent> */}
              </Segment>
            </SegmentContainer>
          </div>
        </div>
      </PageHOC>
    </>
  );
};

export default Page;
