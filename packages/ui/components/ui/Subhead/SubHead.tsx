import React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/utils';

const Size = {
  xxs: 'text-[14px]',
  xs: 'text-[16px]',
  sm: 'text-[18px]',
  md: 'text-[18px]',
  lg: 'text-[20px]',
};

const subheadingVariant = cva('text-[var(--subhead-fg-primary)]', {
  variants: {
    size: {
      xxs: 'text-[10px]',
      xs: 'text-[12px]',
      sm: 'text-[12px]',
      md: 'text-[14px]',
      lg: 'text-[14px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
const headingVariant = cva('text-[var(--subhead-fg-primary)] font-semibold', {
  variants: {
    size: Size,
  },
  defaultVariants: {
    size: 'md',
  },
});

interface Props {
  subheading?: string;
  heading: string;
  size: keyof typeof Size;
  icon?: React.ReactNode;
  leftElement?: React.ReactNode;
}
export const SubHead = ({
  heading,
  subheading,
  size,
  leftElement,
  icon,
}: Props) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-start flex-col">
          <div className="flex justify-start items-center gap-1">
            {icon}
            <h1 className={cn(headingVariant({ size }))}>{heading}</h1>
          </div>
          {subheading && (
            <p className={cn(subheadingVariant({ size }))}>{subheading}</p>
          )}
        </div>
        {leftElement}
      </div>
    </>
  );
};
