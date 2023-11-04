import React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/utils';

const Variant = {
  primary: cn(
    'focus:bg-[var(--button-primary-surface-focused)] focus:border-2 focus:border-[var(--button-primary-border-focused)]',
    'bg-[var(--button-primary-surface-default)] border border-[var(--button-primary-border-default)]',
    'hover:bg-[var(--button-primary-surface-hovered)]',
    'disabled:bg-[var(--button-primary-surface-disabled)]',
  ),
  secondary: cn(
    'focus:bg-[var(--button-secondary-surface-focused)] focus:border-2 focus:border-[var(--button-secondary-border-focused)]',
    'bg-[var(--button-secondary-surface-default)] border border-[var(--button-secondary-border-default)]',
    'hover:bg-[var(--button-secondary-surface-hovered)] ',
    'disabled:bg-[var(--button-secondary-surface-disabled)]',
  ),
  outline: cn(
    'focus:bg-[var(--button-outline-surface-focused)] focus:border-2 focus:border-[var(--button-outline-border-focused)]',
    'bg-[var(--button-outline-surface-default)] border border-[var(--button-outline-border-default)]',
    'hover:bg-[var(--button-outline-surface-hovered)]',
    'disabled:bg-[var(--button-outline-surface-disabled)]',
  ),
  tertiary: cn(
    'focus:bg-[var(--button-tertiary-surface-focused)] focus:border-2 focus:border-[var(--button-tertiary-border-focused)]',
    'bg-[var(--button-tertiary-surface-default)] border border-[var(--button-tertiary-border-default)]',
    'hover:bg-[var(--button-tertiary-surface-hovered)]',
    'disabled:bg-[var(--button-tertiary-surface-disabled)]',
  ),
  link: cn(
    'focus:bg-[var(--button-link-surface-focused)] focus:border-2 focus:border-[var(--button-link-border-focused)]',
    'bg-[var(--button-link-surface-default)] border border-[var(--button-link-border-default)]',
    'hover:bg-[var(--button-link-surface-hovered)]',
    'disabled:bg-[var(--button-link-surface-disabled)]',
  ),
  danger: cn(
    'focus:bg-[var(--button-danger-surface-focused)] focus:border-2 focus:border-[var(--button-danger-border-focused)]',
    'bg-[var(--button-danger-surface-default)] border border-[var(--button-danger-border-default)]',
    'hover:bg-[var(--button-danger-surface-hovered)]',
    'disabled:bg-[var(--button-danger-surface-disabled)]',
  ),
  success: cn(
    'focus:bg-[var(--button-success-surface-focused)] focus:border-2 focus:border-[var(--button-success-border-focused)]',
    'bg-[var(--button-success-surface-default)] border border-[var(--button-success-border-default)]',
    'hover:bg-[var(--button-success-surface-hovered)]',
    'disabled:bg-[var(--button-success-surface-disabled)]',
  ),
};
const SizeVariant = {
  md: 'h-[44px] py-0 px-[16px]',
  sm: 'h-[36px] py-0 px-[16px]',
  xs: 'h-[32px] py-0 px-[16px]',
};
const buttonVariant = cva(' rounded-[8px]', {
  variants: {
    variant: Variant,
    sizeVariant: SizeVariant,
  },
  defaultVariants: {
    variant: 'primary',
    sizeVariant: 'sm',
  },
});
interface Props extends React.HTMLProps<HTMLButtonElement> {
  variant: keyof typeof Variant;
  sizeVariant?: keyof typeof SizeVariant;
}

export const Button = (props: Props) => {
  return (
    <button
      className={cn(
        buttonVariant({
          variant: props.variant,
          sizeVariant: props.sizeVariant,
        }),
        props.className,
      )}
      type={(props.type as any) ?? 'button'}
      {...props}
    >
      {props.children}
    </button>
  );
};
