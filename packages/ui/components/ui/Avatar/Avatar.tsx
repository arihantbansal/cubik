import React from 'react';

import { Icon } from '../../../icons/icon';
import { cn } from '../../../lib/utils';

interface AvatarProps {
  src?: React.ReactNode;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  shape?: 'square' | 'circle';
  Icon?: React.ReactNode;
}

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
  '2xl': 'w-32 h-32',
  '3xl': 'w-48 h-48',
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  shape = 'circle',
  Icon,
}) => {
  const roundedClass = shape === 'circle' ? 'rounded-full' : 'rounded';

  return (
    <div
      className={cn(
        'bg-zinc-800 flex  justify-center items-center relative border-2  ',
        sizeClasses[size],
        roundedClass,
      )}
    >
      {typeof src === 'string' && (
        <img
          src={src}
          alt={alt}
          className={cn(
            'object-cover relative w-full h-full z-5',
            roundedClass,
          )}
        />
      )}
      {Icon && (
        <div
          className={cn(
            shape === 'square' &&
              'absolute -bottom-2 -right-2 p-1 bg-zinc-800  rounded-full z-200',
            shape === 'circle' &&
              'absolute bottom-5 right-8 p-1 bg-zinc-800  rounded-full z-200',
          )}
        >
          {Icon}
        </div>
      )}
    </div>
  );
};

export { Avatar };
export type { AvatarProps };
