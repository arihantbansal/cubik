import React, { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils';

const InputLabelVariants = cva('transition-colors', {
  variants: {
    fontSize: {
      md: 'text-[16px] font-[84] leading-[24px]',
      sm: 'text-[14px] font-[84] leading-4',
    },
  },
  defaultVariants: {
    fontSize: 'md',
  },
});

type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof InputLabelVariants> & {
    counterValue?: number; // current value for the counter
    maxCounterValue?: number; // max value for the counter and set to show the counter in UI
    isRequired?: boolean;
    icon?: React.ReactNode;
  };

const InputLabel = forwardRef<HTMLElement | null, TextProps>(
  ({ className, children, fontSize, ...props }) => {
    return (
      <>
        <div className="flex justify-between items-start w-full">
          <div className="flex justify-start items-start gap-1">
            <p
              className={cn(
                InputLabelVariants({
                  fontSize,
                }),
                'text-[var(--color-fg-primary)]',
                className,
              )}
              {...props}
            >
              {children}
            </p>
            {props.isRequired && (
              <span
                className={cn(
                  InputLabelVariants({
                    fontSize,
                  }),
                  'text-[var(--color-red-500)]',
                )}
              >
                *
              </span>
            )}
            {props.icon}
          </div>
          {props.maxCounterValue && (
            <p
              className={cn(
                InputLabelVariants({
                  fontSize,
                }),
                'text-[var(--color-fg-tertiary)]',
              )}
            >
              {props.counterValue}/{props.maxCounterValue}
            </p>
          )}
        </div>
      </>
    );
  },
);

InputLabel.displayName = 'InputLabel';

export { InputLabel, InputLabelVariants };
