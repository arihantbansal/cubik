import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn, handleMediaQuery } from '../../../lib/utils';

const buttonVariants = cva('font-semibold rounded-[8px]', {
  variants: {
    variant: {
      primary: cn(
        'focus:bg-[var(--button-primary-surface-focused)] focus:border-2  focus:text-[var(--button-primary-text-focused)] focus:border-[var(--button-primary-border-focused)]',
        'bg-[var(--button-primary-surface-default)] text-[var(--button-primary-text-default)] focus:border ',
        'hover:bg-[var(--button-primary-surface-hovered)] hover:text-[var(--button-primary-text-hovered)]',
        'disabled:bg-[var(--button-primary-surface-disabled)]',
      ),
      secondary: cn(
        'focus:bg-[var(--button-secondary-surface-focused)] focus:border-2 focus:border-[var(--button-secondary-border-focused)]',
        'bg-[var(--button-secondary-surface-default)] text-[var(--button-secondary-text-default)] focus:border',
        'hover:bg-[var(--button-secondary-surface-hovered)] hover:text-[var(--button-secondary-text-hovered)]',
        'disabled:bg-[var(--button-secondary-surface-disabled)]',
      ),
      outline: cn(
        'bg-[var(--button-outline-surface-default)] border border-[var(--button-outline-border-default)] focus:bg-[var(--button-outline-surface-focused)] focus:border-2 focus:border-[var(--button-outline-border-focused)] focus:border text-[var(--button-outline-text-default)] hover:bg-[var(--button-outline-surface-hovered)] hover:text-[var(--button-outline-text-hovered)] disabled:bg-[var(--button-outline-surface-disabled)]',
      ),
      tertiary: cn(
        'focus:bg-[var(--button-tertiary-surface-focused)] focus:border-2 focus:border-[var(--button-tertiary-border-focused)]',
        'bg-[var(--button-tertiary-surface-default)] focus:border text-[var(--button-tertiary-text-default)]',
        'hover:bg-[var(--button-tertiary-surface-hovered)] hover:text-[var(--button-tertiary-text-hovered)]',
        'disabled:bg-[var(--button-tertiary-surface-disabled)]',
      ),
      link: cn(
        'focus:bg-[var(--button-link-surface-focused)] focus:border-2 focus:border-[var(--button-link-border-focused)]',
        'bg-[var(--button-link-surface-default)]  text-[var(--button-link-text-default)]',
        'hover:bg-[var(--button-link-surface-hovered)] hover:text-[var(--button-link-text-hovered)]',
        'disabled:bg-[var(--button-link-surface-disabled)]',
      ),
      danger: cn(
        'focus:bg-[var(--button-danger-surface-focused)] focus:border-2 focus:border-[var(--button-danger-border-focused)]',
        'bg-[var(--button-danger-surface-default)] focus:border text-[var(--button-danger-text-default)]',
        'hover:bg-[var(--button-danger-surface-hovered)] hover:text-[var(--button-danger-text-hovered)]',
        'disabled:bg-[var(--button-danger-surface-disabled)]',
      ),
      success: cn(
        'focus:bg-[var(--button-success-surface-focused)] focus:border-2 focus:border-[var(--button-success-border-focused)]',
        'bg-[var(--button-success-surface-default)] focus:border text-[var(--button-success-text-default)]',
        'hover:bg-[var(--button-success-surface-hovered)] hover:text-[var(--button-success-text-hovered)]',
        'disabled:bg-[var(--button-success-surface-disabled)]',
      ),
    },
    size: {
      md: 'h-[44px] py-0 px-[16px]',
      sm: 'h-[36px] py-0 px-[16px]',
      xs: 'h-[32px] py-0 px-[16px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
});
interface Props
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ variant, size, className, ...props }: Props) => {
  return (
    <button
      // className={cn(className, buttonVariants({ variant, size }))}
      className={cn(
        handleMediaQuery([
          {
            className: buttonVariants({
              variant,
              size,
            }),
            type: 'default',
          },
          {
            className: buttonVariants({
              variant,
              size: 'sm',
            }),
            type: 'md',
          },
        ]),

        className,
      )}
      type={(props.type as any) ?? 'button'}
      {...props}
    >
      {props.children}
    </button>
  );
};
