'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import { InputLabel } from '@cubik/ui';

const InputLabelPage = () => {
  return (
    <>
      <PageHOC
        pages={[
          { name: 'Component', href: '/component', current: false },
          {
            name: 'Input',
            href: '/component/inputlabel',
            current: true,
          },
        ]}
        heading={'Input Label'}
        description=""
      >
        <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
          <CodeComponent codeString='import { InputLabel } from "@cubik/ui"' />
        </div>
        <div className="flex flex-col gap-10">
          <InputLabel
            fontSize={'md'}
            counterValue={0}
            maxCounterValue={100}
            isRequired={true}
          >
            hello world
          </InputLabel>
          <InputLabel fontSize={'md'} isRequired={true}>
            hello world
          </InputLabel>
          <InputLabel fontSize={'md'} isRequired={false}>
            hello world
          </InputLabel>
          <InputLabel
            fontSize={'md'}
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 7V9.33333M7 5.03125V5.03059M12.25 7C12.25 9.8995 9.89949 12.25 7 12.25C4.1005 12.25 1.75 9.89949 1.75 7C1.75 4.1005 4.10051 1.75 7 1.75C9.8995 1.75 12.25 4.10051 12.25 7Z"
                  stroke="#808080"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            isRequired={false}
          >
            hello world
          </InputLabel>
          <InputLabel
            fontSize={'sm'}
            icon={
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 7V9.33333M7 5.03125V5.03059M12.25 7C12.25 9.8995 9.89949 12.25 7 12.25C4.1005 12.25 1.75 9.89949 1.75 7C1.75 4.1005 4.10051 1.75 7 1.75C9.8995 1.75 12.25 4.10051 12.25 7Z"
                  stroke="#808080"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            isRequired={false}
          >
            hello world
          </InputLabel>
          <InputLabel
            fontSize={'sm'}
            counterValue={0}
            maxCounterValue={100}
            isRequired={true}
          >
            hello world
          </InputLabel>
          <InputLabel fontSize={'sm'} isRequired={true}>
            hello world
          </InputLabel>
          <InputLabel fontSize={'sm'} isRequired={false}>
            hello world
          </InputLabel>
        </div>
      </PageHOC>
    </>
  );
};

export default InputLabelPage;
