import React, { FunctionComponent } from 'react';
import { cva } from 'class-variance-authority';

import { Icon } from '../../../icons/icon';
import { cn } from '../../../lib/utils';

const Variants = {
  'solid-green':
    'bg-[var(--tag-solid-surface-green)] text-[var(--tag-solid-text-green)]',
  'solid-orange':
    'bg-[var(--tag-solid-surface-orange)] text-[var(--tag-solid-text-orange)]',
  'solid-red':
    'bg-[var(--tag-solid-surface-red)] text-[var(--tag-solid-text-red)]',
  default:
    'bg-[var(--tag-solid-surface-default)] text-[var(--tag-solid-text-default)]',
  'solid-yellow':
    'bg-[var(--tag-solid-surface-yellow)] text-[var(--tag-solid-text-yellow)]',
  'solid-purple':
    'bg-[var(--tag-solid-surface-purple)] text-[var(--tag-solid-text-purple)]',
  'solid-blue':
    'bg-[var(--tag-solid-surface-blue)] text-[var(--tag-solid-text-blue)]',
  'subtle-default':
    'bg-[var(--tag-subtle-surface-default)] text-[var(--tag-subtle-text-default)]',
  'subtle-red':
    'bg-[var(--tag-subtle-surface-red)] text-[var(--tag-subtle-text-red)]',
  'subtle-blue':
    'bg-[var(--tag-subtle-surface-blue)] text-[var(--tag-subtle-text-blue)]',
  'subtle-yellow':
    'bg-[var(--tag-subtle-surface-yellow)] text-[var(--tag-subtle-text-yellow)]',
  'subtle-purple':
    'bg-[var(--tag-subtle-surface-purple)] text-[var(--tag-subtle-text-purple)]',
  'subtle-orange':
    'bg-[var(--tag-subtle-surface-orange)] text-[var(--tag-subtle-text-orange)]',
  'subtle-green':
    'bg-[var(--tag-subtle-surface-green)] text-[var(--tag-subtle-text-green)]',
};
const Size = {
  xs: 'px-[4px] py-[0px] text-[8px]',
  sm: 'px-[6px] py-[2px] text-[10px]',
  md: 'px-[8px] py-[2px] text-[12px]',
  lg: 'px-[8px] py-[4px] text-[12px]',
  xl: 'px-[10px] py-[4px] text-[14px]',
  '2xl': 'px-[12px] py-[4px] text-[16px]',
};
const tagVariant = cva(
  'flex rounded-full justify-center items-center w-fit font-bold',
  {
    variants: {
      size: Size,
      variant: Variants,
    },
    defaultVariants: {
      size: 'md',
      variant: 'solid-red',
    },
  },
);

const tagIconCross = cva('', {
  variants: {
    size: {
      xs: 'w-[14px] h-[14px]',
      sm: 'w-[16px] h-[16px]',
      md: 'w-[18px] h-[18px]',
      lg: 'w-[18px] h-[18px]',
      xl: 'w-[18px] h-[18px]',
      '2xl': 'w-[18px] h-[18px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
const tagIconPlus = cva('', {
  variants: {
    size: {
      xs: 'w-[14px] h-[14px]',
      sm: 'w-[16px] h-[16px]',
      md: 'w-[18px] h-[18px]',
      lg: 'w-[20px] h-[20px]',
      xl: 'w-[22px] h-[22px]',
      '2xl': 'w-[22px] h-[22px]',
    },
    variant: {
      'solid-green': 'stroke-[var(--tag-solid-text-green)]',
      'solid-orange': 'stroke-[var(--tag-solid-text-orange)]',
      'solid-red': 'stroke-[var(--tag-solid-text-red)]',
      default: 'stroke-[var(--tag-solid-text-default)]',
      'solid-yellow': 'stroke-[var(--tag-solid-text-yellow)]',
      'solid-purple': 'stroke-[var(--tag-solid-text-purple)]',
      'solid-blue': 'stroke-[var(--tag-solid-text-blue)]',
      'subtle-default': 'stroke-[var(--tag-subtle-text-default)]',
      'subtle-red': 'stroke-[var(--tag-subtle-text-red)]',
      'subtle-blue': 'stroke-[var(--tag-subtle-text-blue)]',
      'subtle-yellow': 'stroke-[var(--tag-subtle-text-yellow)]',
      'subtle-purple': 'stroke-[var(--tag-subtle-text-purple)]',
      'subtle-orange': 'stroke-[var(--tag-subtle-text-orange)]',
      'subtle-green': 'stroke-[var(--tag-subtle-text-green)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface Props {
  children: React.ReactNode | string;
  size: keyof typeof Size;
  variant: keyof typeof Variants;
  className?: string;
  onClickPlus?: () => void;
  onClickCross?: () => void;
}

export const Tag: FunctionComponent<Props> = ({
  children,
  size,
  variant,
  className,
  onClickCross,
  onClickPlus,
}) => {
  return (
    <div className={cn(tagVariant({ variant, size }), className)}>
      <div onClick={onClickPlus}>
        <Icon name="plus" className={cn(tagIconPlus({ size, variant }))} />
      </div>
      <div className={cn(tagVariant({ size, variant }))}>{children}</div>
      <div onClick={onClickCross}>
        <Icon
          name="cross"
          className={cn(
            'fill-[var(--color-neutral-500)]',
            tagIconCross({ size }),
          )}
        />
      </div>
    </div>
  );
};
