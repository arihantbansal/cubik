import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { Icon } from '../../../icons/icon';
import { iconLibrary } from '../../../icons/iconLibrary';
import { cn } from '../../../lib/utils';

const titleVariants = cva(
  'flex relative font-semibold text-[var(--avatar-label-title)]',
  {
    variants: {
      variant: {
        xs: 'text-sm',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-lg',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  },
);

interface TitleWithIconProps extends VariantProps<typeof titleVariants> {
  text: string;
  icon?: keyof typeof iconLibrary;
  variant?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const TitleWithIcon: React.FC<TitleWithIconProps> = ({
  text,
  icon,
  variant = 'md',
}) => {
  return (
    <div className={cn('flex items-center gap-2')}>
      <p className={cn(titleVariants({ variant }))}>{text}</p>
      {icon && <Icon name={icon} fill="#007BFF" stroke="#1F1F1F" />}
    </div>
  );
};

export default TitleWithIcon;
