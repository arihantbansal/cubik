import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils';
import { Avatar, AvatarProps } from './Avatar';

const avatarGroupVariants = cva('flex relative', {
  variants: {
    variant: {
      squared: '',
      circular: '',
      'squared-horizontal': 'grid grid-cols-2 gap-1 items-center',
    },
    size: {
      xs: '-space-x-[0.625rem]',
      sm: '-space-x-4',
      md: '-space-x-5',
      lg: '-space-x-6',
      xl: '-space-x-7',
      '2xl': '-space-x-9',
      '3xl': '-space-x-9',
    },
  },
  defaultVariants: {
    variant: 'circular',
  },
});

export interface AvatarGroupProps
  extends VariantProps<typeof avatarGroupVariants> {
  avatars: AvatarProps[];
  shape?: 'circle' | 'square';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant?: 'circular' | 'squared' | 'squared-horizontal';
  maxCount?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  shape,
  size = 'md',
  variant = 'circular',
  maxCount = 3,
}) => {
  const overflowCount = avatars.length > 3 ? true : false;

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          avatarGroupVariants(
            variant === 'squared-horizontal' ? { variant } : { size, variant },
          ),
        )}
      >
        {avatars.slice(0, maxCount).map((avatar, index) => (
          <Avatar
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            size={size}
            variant={shape}
          />
        ))}
        {variant === 'squared-horizontal' && overflowCount && (
          <span className="flex items-center justify-center text-[var(--avatar-label-title)] text-xs font-medium rounded-full">
            +{avatars.length - 3}
          </span>
        )}
      </div>
    </div>
  );
};
