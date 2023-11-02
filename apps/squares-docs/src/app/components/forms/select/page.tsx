'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';
import PageHOC from '@/app/home-page-components/components/pageHOC';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cubik/ui';

const SelectPage = () => {
  return (
    <PageHOC
      pages={[
        { name: 'Component', href: '/component', current: false },
        {
          name: 'Input',
          href: '/component/input',
          current: true,
        },
      ]}
      heading={'Input'}
      description=""
    >
      <div>
        <div className="border-[var(--color-border-primary) overflow-hidden rounded-[8px] border bg-[var(--white)] px-6 py-4">
          <CodeComponent
            codeString='import { Select,
        SelectGroup,
        SelectValue,
        SelectTrigger,
        SelectContent,
        SelectLabel,
        SelectSeparator,
        SelectItem
        } from "@cubik/ui"'
          />
        </div>

        <div className="mt-10 flex flex-col gap-10">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="light" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger isError={true}>
              <SelectValue placeholder="light" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Select disabled={true}>
            <SelectTrigger>
              <SelectValue placeholder="light" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </PageHOC>
  );
};

export default SelectPage;
