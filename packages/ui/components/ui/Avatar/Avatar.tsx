import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { Icon } from '../../../icons/icon';
import { iconLibrary } from '../../../icons/iconLibrary';
import { cn } from '../../../lib/utils';

const avatarVariants = cva('object-cover', {
  variants: {
    variant: {
      square: 'rounded-lg',
      circle: 'rounded-full',
    },
    size: {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-[3.375rem] h-[3.375rem]',
      xl: 'w-16 h-16',
      '2xl': 'w-20 h-20',
      '3xl': 'w-[5.875rem] h-[5.875rem]',
    },
  },
  defaultVariants: {
    variant: 'circle',
    size: 'md',
  },
});

const iconVariants = cva(
  'absolute block h-3 w-3 z-200 rounded-full bg-[var(--avatar-status)] border border-[var(--avatar-status)]',
  {
    variants: {
      variant: {
        square: '-bottom-1 -right-1',
        circle: 'bottom-0 right-0',
      },
      size: {
        xs: 'w-[0.375rem] h-[0.375rem]',
        sm: 'w-2 h-2',
        md: 'w-[0.625rem] h-[0.625rem]',
        lg: 'w-[0.875rem] h-[0.875rem]',
        xl: 'w-4 h-4',
        '2xl': 'w-5 h-5',
        '3xl': 'w-5 h-5',
      },
    },
  },
);

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src: string;
  alt: string;
  className?: string;
  iconName?: keyof typeof iconLibrary;
}

const Avatar = ({
  src,
  alt,
  variant,
  size,
  className,
  iconName,
}: AvatarProps) => {
  return (
    <span className="relative inline-block overflow-hidden w-12rem">
      <img
        src={src}
        alt={alt}
        className={cn(avatarVariants({ variant, size, className }))}
      />
      {iconName && (
        <Icon name={iconName} className={cn(iconVariants({ variant, size }))} />
      )}
    </span>
  );
};

export { Avatar };
export type { AvatarProps };
