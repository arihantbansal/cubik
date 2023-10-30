'use client';

import React from 'react';

import { Icon } from '@cubik/ui';
import {useTheme} from '@/app/home-page-components/hooks/useTheme';

const HeaderButtons = () => {
  const {toggleTheme} =  useTheme();
  return (
    <div className="hidden h-fit flex-row items-center justify-center gap-8 sm:flex">
      <button
        // onClick={() => {
        //   const ele = document.querySelector('html');
        //   if (!ele?.className) return;
        //   if (ele.className === 'dark') {
        //     ele.className = 'light';
        //   } else {
        //     ele.className = 'dark';
        //   }
        // }}
        onClick={toggleTheme}
      >
        <Icon
          name={'github'}
          stroke={'var(--color-fg-primary)'}
          strokeWidth={2}
          fill="none"
          height={26}
          width={26}
        />
      </button>
      <Icon
        name={'github'}
        stroke={'var(--color-fg-primary)'}
        strokeWidth={2}
        fill="none"
        height={26}
        width={26}
      />
      <Icon
        name={'figma'}
        stroke={'var(--color-fg-primary)'}
        strokeWidth={2}
        fill="none"
        height={26}
        width={26}
      />
    </div>
  );
};

export default HeaderButtons;
