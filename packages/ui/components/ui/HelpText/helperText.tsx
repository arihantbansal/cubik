import React, { forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils';

const helperTextVariants = cva('transition-colors', {
  variants: {
    variant: {
      success: 'text-[var(--color-fg-success)]',
      default: 'text-[var(--color-fg-tertiary)]',
      error: 'text-[var(--color-fg-error)]',
    },
    fontSize: {
      md: 'text-[14px] font-[84] leading-5',
      sm: 'text-[12px] font-[84] leading-4',
    },
  },
  defaultVariants: {
    fontSize: 'md',
  },
});

type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof helperTextVariants>;

const HelperText = forwardRef<HTMLElement | null, TextProps>(
  ({ className, children, fontSize, variant, ...props }) => {
    return (
      <p
        className={cn(
          helperTextVariants({
            fontSize,
            variant,
          }),
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);

HelperText.displayName = 'HelperText';

export { HelperText, helperTextVariants };
