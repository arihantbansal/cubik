import React from 'react';

import { cn } from '@cubik/ui/lib/utils';

interface Props {
  type: 'Accepted' | 'Received' | 'Declined';
  color: string;
  count: number;
}
export const EmailCard = (props: Props) => {
  return (
    <div className="flex h-28 w-full flex-col gap-3 rounded-md bg-neutral-800 p-3">
      <div className="flex justify-between">
        <div className="flex items-center justify-start gap-2">
          <div className={cn('w-3 h-3 rounded-full', props.color)} />
          <p className="text-surface-neutral-500">{props.type}</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          {props.type === 'Accepted' && (
            <button className="rounded bg-[#2E2E2E] px-4 py-1 text-sm text-white">
              New Mail
            </button>
          )}
          <button className="rounded bg-[#2E2E2E] px-4 py-2 text-white">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_127_11030)">
                <path
                  d="M9.33332 13.3334H7.99999C6.13315 13.3334 5.19973 13.3334 4.48669 12.97C3.85948 12.6505 3.34955 12.1405 3.02997 11.5133C2.66666 10.8003 2.66666 9.86686 2.66666 8.00002C2.66666 6.67066 2.66666 5.81461 2.79784 5.17441M15.8688 5.17441L12.1967 7.51123C11.159 8.17158 10.6401 8.50176 10.0825 8.63037C9.58952 8.74408 9.07712 8.74408 8.58414 8.63037C8.02653 8.50176 7.50768 8.17158 6.46998 7.51123L2.79784 5.17441M15.8688 5.17441C16 5.81461 16 6.67066 16 8.00002C16 8.50904 16 8.94867 15.9926 9.33335M15.8688 5.17441C15.8158 4.91557 15.7413 4.69201 15.6367 4.48672C15.3171 3.85951 14.8072 3.34958 14.18 3.03C13.4669 2.66669 12.5335 2.66669 10.6667 2.66669H7.99999C6.13315 2.66669 5.19973 2.66669 4.48669 3.03C3.85948 3.34958 3.34955 3.85951 3.02997 4.48672C2.92537 4.69201 2.85088 4.91557 2.79784 5.17441M12 13.3334H16M16 13.3334C16 13.4032 15.9767 13.473 15.9301 13.5305C15.5853 13.956 15.1891 14.3377 14.7504 14.6667M16 13.3334C16 13.2636 15.9767 13.1938 15.9301 13.1362C15.5853 12.7107 15.1891 12.329 14.7504 12"
                  stroke="#EDEDED"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_127_11030">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="translate(0.666656)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <div className="text-3xl font-semibold text-white">
        <p>{props.count}</p>
      </div>
    </div>
  );
};
