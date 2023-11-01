import React, { FunctionComponent } from 'react';

import { Icon } from '../../icons/icon';
import { iconLibrary } from '../../icons/iconLibrary';
import { cn } from '../../lib/utils';

interface Props {
  children: React.ReactNode | string;
  size: 'sm' | 'md' | 'lg';
  iconName?: keyof typeof iconLibrary;
  variant?: string;
  className?: string;
}

export const Tag: FunctionComponent<Props> = ({
  children,
  size,
  iconName,
  variant,
  className,
}) => {
  return (
    <div className="w-fit border border-red-300 rounded-full">
      <div
        className={cn(
          'inline-flex px-3 py-1 rounded-full space-x-1 items-center',
          className,
        )}
      >
        {iconName ? (
          <Icon
            name={iconName}
            strokeWidth={1}
            fill="none"
            height={18}
            width={18}
          />
        ) : (
          <>
            {size}-{variant}
          </>
        )}
        <div className="relative leading-[16px] text-xs font-medium">
          {children}
        </div>
      </div>
    </div>
  );
};
