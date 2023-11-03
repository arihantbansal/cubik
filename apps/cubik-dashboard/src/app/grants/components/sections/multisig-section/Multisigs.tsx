import React from 'react';

import MultisigCard from '../registration-section/cards/MultisigCard';
import OverviewCard from '../registration-section/cards/OverviewCard';
import TreasuryCard from '../registration-section/cards/TreasuryCard';

export const MultisigSection = () => {
  return (
    <div className="my-5 flex items-center justify-between px-3 md:px-0 ">
      <div className="w-full">
        {/* <Subhead text=Overview" /> */}
        <div className="my-6 grid w-full grid-cols-3 space-x-6">
          <TreasuryCard
            iconName="USDC"
            title="Matching Amount"
            amount="50,000"
            symbol="$"
            classname="bg-yellow-500"
          />
          <TreasuryCard
            iconName="bank"
            title="All Treasuries Balance"
            amount="38,000"
            symbol="$"
            classname="bg-green-500"
          />
          <TreasuryCard
            iconName="piggyBank"
            title="Matching Amount"
            amount="50,000"
            symbol="$"
            classname="bg-purple-500"
          />
        </div>
        {/* <Subhead text="Multisigs" /> */}
        <div className="flex space-x-4">
          <div className="flex w-full flex-[0.7]">
            <MultisigCard />
          </div>
          <div className="flex flex-[0.3]">
            <OverviewCard />
          </div>
        </div>
      </div>
    </div>
  );
};
