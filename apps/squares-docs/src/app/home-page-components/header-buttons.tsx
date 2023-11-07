'use client';

import React, { Dispatch, SetStateAction } from 'react';

import { Icon } from '@cubik/ui';

import { useTheme } from './../home-page-components/utils';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
const HeaderButtons = (props: Props) => {
  const { toggleTheme } = useTheme();
  return (
    <div className="flex h-fit flex-row items-center justify-center gap-8">
      <button onClick={toggleTheme}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="h-6 w-6 stroke-black dark:stroke-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </button>
      <button onClick={() => props.setIsOpen(!props.isOpen)}>
        {props.isOpen ? (
          <Icon name="cross" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            className="h-6 w-6 stroke-black dark:stroke-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>
      {/* <Icon
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
      /> */}
    </div>
  );
};

export default HeaderButtons;
