import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const helperTextVariants = cva('transition-colors', {
  variants: {
    variant: {
      success: 'text-[#29CC44]',
      default: 'text-[#808080]',
      error: 'text-[#F53D6B]',
    },
    fontSize: {
      xl: 'text-xl',
      lg: 'text-lg',
      md: 'text-md',
      sm: 'text-sm',
      xs: 'text-xs',
    },
  },
  defaultVariants: {
    fontSize: 'md',
  },
});

type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof helperTextVariants> & {
    asChild?: boolean;
    as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  };

const HelperText = forwardRef<HTMLElement | null, TextProps>(
  ({ className, asChild = false, as: Tag = 'p', ...props }, ref) => {
    const Comp = asChild ? Slot : Tag;
    return (
      // @ts-ignore
      <Comp className={cn(helperTextVariants({ className }))} {...props} />
    ); // ref is missing here
  },
);

HelperText.displayName = 'HelperText';

export { HelperText, helperTextVariants };
