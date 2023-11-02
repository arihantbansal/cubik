import React from 'react';

import {
  AvatarLabelGroup,
  Button,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@cubik/ui';

const OverviewCard = () => {
  return (
    <div className="bg-muted h-fit w-full rounded-lg">
      <div className="flex items-center justify-between p-4 pb-0">
        <h3 className="text-lg font-semibold">Overview</h3>
      </div>
      <Tabs defaultValue="owners" size="md" className="mt-6 rounded-b-lg">
        <TabList className="w-full  overflow-x-auto whitespace-nowrap bg-neutral-800">
          <div className="border-b-surface-neutral-800 w-full max-w-7xl border-b ">
            <Tab className="text-sm font-normal" value="owners">
              Owners
            </Tab>
            <Tab value="threshold" className="text-sm font-normal">
              Threshold
            </Tab>
            <Tab value="assets" className="text-sm font-normal">
              Assets
            </Tab>
          </div>
        </TabList>
        <TabPanels className="mx-auto w-full max-w-7xl rounded-b-lg bg-[#1F1F1F] p-4">
          <TabPanel value="owners">
            <div className="space-y-3">
              <AvatarLabelGroup
                avatarSrc="/dhruvAvatar.jpeg"
                title="@leatha.Ritchie77"
                size="sm"
              />
              <AvatarLabelGroup
                avatarSrc="/dhruvAvatar.jpeg"
                title="@margie17"
                size="sm"
              />
              <AvatarLabelGroup
                avatarSrc="/dhruvAvatar.jpeg"
                title="@Leatha.Ritchie77"
                size="sm"
              />
            </div>
          </TabPanel>
          <TabPanel value="threshold">asdfdsf</TabPanel>
          <TabPanel value="assets">asdffs</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default OverviewCard;
