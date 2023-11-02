import React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '../../../lib/utils';
import { Avatar, AvatarProps } from './Avatar';
import { AvatarGroup } from './AvatarGroup';
import TitleWithIcon from './TitleWithIcon';

interface AvatarLabelProps {
  avatarSrc: string | AvatarProps[];
  shape?: 'square' | 'circle';
  title: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  avatarShape?: 'circle' | 'square';
}

const subTitleVariants = cva('flex relative', {
  variants: {
    size: {
      xs: 'text-[0.625] ml-1',
      sm: 'text-[0.625] ml-1',
      md: 'text-xs ml-[0.375rem]',
      lg: 'text-xs ml-[0.375rem]',
      xl: 'text-xs ml-[0.375rem]',
      '2xl': 'text-sm ml-2',
      '3xl': 'text-sm ml-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const descriptionVariants = cva(
  'flex relative text-[var(--avatar-label-description)] font-normal overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-inline-box]',
  {
    variants: {
      size: {
        xs: 'text-[0.6875rem] leading-4',
        sm: 'text-xs leading-4 ',
        md: 'text-xs leading-4',
        lg: 'text-xs leading-4',
        xl: 'text-sm leading-5',
        '2xl': 'text-base leading-6',
        '3xl': 'text-lg leading-7 ',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const gapVariants = cva('text-[var(--avatar-label-subtitle)] font-normal', {
  variants: {
    size: {
      xs: 'gap-[0.125rem] ml-2',
      sm: 'gap-[0.125rem] ml-[0.625rem]',
      md: 'gap-[0.125rem] ml-3',
      lg: 'gap-[0.375rem] ml-4',
      xl: 'gap-1 ml-[1.125rem]',
      '2xl': 'gap-[0.375rem] ml-[1.125rem]',
      '3xl': 'gap-2 ml-[1.125rem]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const AvatarLabelGroup: React.FC<AvatarLabelProps> = ({
  avatarSrc,
  shape,
  title,
  subtitle,
  description,
  longDescription,
  size,
}) => {
  return (
    <div className={cn('flex items-center gap-2 max-w-md')}>
      <div className="flex-shrink-0">
        {typeof avatarSrc === 'string' ? (
          <Avatar src={avatarSrc} alt="sample" size={size} variant={shape} />
        ) : (
          <AvatarGroup avatars={avatarSrc} size={size} />
        )}
      </div>

      <div className={cn(gapVariants({ size }))}>
        <div className="flex items-center">
          <TitleWithIcon text={title} variant={size} />
          {subtitle && (
            <span className={cn(subTitleVariants({ size }))}>{subtitle}</span>
          )}
        </div>

        {description && (
          <p className={cn(descriptionVariants({ size }))}>{description}</p>
        )}
        {longDescription && (
          <p className={cn(descriptionVariants({ size }))}>{longDescription}</p>
        )}
      </div>
    </div>
  );
};

export { AvatarLabelGroup };
