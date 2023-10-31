import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { Icon } from '../../../icons/icon';
import { cn } from '../../../lib/utils';

export const HeadingSizeStyles = {
  lg: 'text-[22px]',
  md: 'text-[20px]',
  sm: 'text-[18px]',
  xs: 'text-[14px]',
};

interface Props {
  heading: string;
  headingSize: keyof typeof HeadingSizeStyles;
  onClose: () => void;
  // Icon component for heading
  IconComponent?: React.JSX.Element;

  // Ring SVG background for header
  RingSVG?: JSX.Element;
}
export const ModalHeader = ({
  IconComponent,
  heading,
  headingSize,
  onClose,
  RingSVG,
}: Props) => {
  return (
    <>
      <Dialog.Title className=" relative bg-[var(--color-surface-tertiary)] flex justify-between items-center p-4 m-0 text-[17px] rounded-t-[12px] font-medium">
        <div className="flex justify-center items-center gap-3">
          <div className="absolute left-0">
            {RingSVG ? (
              RingSVG
            ) : (
              <svg
                width="106"
                height="64"
                viewBox="0 0 106 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1772_3525)">
                  <rect
                    opacity="0.01"
                    x="-19.5"
                    y="-23.5"
                    width="111"
                    height="111"
                    rx="55.5"
                    stroke="#007BFF"
                  />
                  <rect
                    opacity="0.05"
                    x="-12.5"
                    y="-16.5"
                    width="97"
                    height="97"
                    rx="48.5"
                    stroke="#007BFF"
                  />
                  <rect
                    opacity="0.1"
                    x="-2.5"
                    y="-6.5"
                    width="77"
                    height="77"
                    rx="38.5"
                    stroke="#007BFF"
                  />
                  <rect
                    opacity="0.2"
                    x="5.5"
                    y="1.5"
                    width="61"
                    height="61"
                    rx="30.5"
                    stroke="#007BFF"
                  />
                  <rect
                    opacity="0.6"
                    x="15.5"
                    y="11.5"
                    width="41"
                    height="41"
                    rx="20.5"
                    stroke="#007BFF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1772_3525">
                    <rect width="106" height="64" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </div>
          {IconComponent ? (
            IconComponent
          ) : (
            <div className="ml-2">
              <Icon name="danger" />
            </div>
          )}
          <p
            className={cn(
              'text-[var(--color-fg-primary)]',
              HeadingSizeStyles[headingSize],
            )}
          >
            {heading}
          </p>
        </div>
        <button onClick={onClose}>
          <Icon name="cross" />
        </button>
      </Dialog.Title>
    </>
  );
};
