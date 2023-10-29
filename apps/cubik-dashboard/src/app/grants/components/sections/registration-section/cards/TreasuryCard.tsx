import React from 'react';

import { Avatar, Icon } from '@cubik/ui';
import { iconLibrary } from '@cubik/ui/icons/iconLibrary';
import { cn } from '@cubik/ui/lib/utils';

type Props = {
  iconName: keyof typeof iconLibrary;
  title: string;
  amount: string;
  symbol: string;
  classname: string;
};

const TreasuryCard = ({
  iconName,
  title,
  amount,
  symbol,
  classname,
}: Props) => {
  console.log('iconBg', classname);
  return (
    <div className="flex items-center space-x-3 rounded-lg border border-[#333333] bg-[#262626] p-4">
      <Avatar
        src={
          <Icon
            name={iconName}
            fill="none"
            stroke="#050505"
            className={cn(
              'p-2 rounded-sm w-auto h-full object-contain',
              classname,
            )}
          />
        }
        shape="square"
      />
      <div className="flex flex-col justify-between">
        <p className="text-xs text-white opacity-60">{title}</p>
        <h3 className="flex items-end font-mono">
          <h6 className="text-sm">{symbol}</h6> {amount}
        </h3>
      </div>
    </div>
  );
};

export default TreasuryCard;
