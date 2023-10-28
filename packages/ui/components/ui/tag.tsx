import React, { FunctionComponent } from 'react';

import { Icon } from '../../icons/icon';
import { iconLibrary } from '../../icons/iconLibrary';
import { cn } from '../../lib/utils';

interface Props {
  selected?: boolean;
  text: string;
  iconName: keyof typeof iconLibrary;
  color: string;
  className?: string;
}

export const Tag: FunctionComponent<Props> = ({
  selected,
  text,
  iconName,
  color,
  className,
}) => {
  return (
    <div className="">
      <div
        className={cn(
          'inline-flex px-3 py-1 rounded-full space-x-1 items-center',
          className,
        )}
      >
        <Icon
          name={iconName}
          stroke={color}
          strokeWidth={1}
          fill="none"
          height={18}
          width={18}
        />
        <div className="relative leading-[16px] text-xs font-medium">
          {text}
        </div>
      </div>
    </div>
  );
};
