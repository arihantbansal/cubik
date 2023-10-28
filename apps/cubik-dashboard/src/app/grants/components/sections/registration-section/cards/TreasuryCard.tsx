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
    <div className="bg-[#262626] rounded-lg p-4 border border-[#333333] flex space-x-3 items-center">
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
      <div className="flex justify-between flex-col">
        <p className="text-xs text-white opacity-60">{title}</p>
        <h3 className="flex font-mono items-end">
          <h6 className="text-sm">{symbol}</h6> {amount}
        </h3>
      </div>
    </div>
  );
};

export default TreasuryCard;
