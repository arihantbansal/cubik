import React from 'react';

import { AvatarLabelGroup, TableCell, TableRow, Tag } from '@cubik/ui';

export const SponsorsTableRows = () => {
  return (
    <>
      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium">
          <AvatarLabelGroup
            avatarSrc="/projectLogo.jpeg"
            title="Superteam"
            subtitle="by @kash"
            size="md"
          />
        </TableCell>

        <TableCell>
          <div className="">
            <h3 className="flex items-end font-mono">
              <h6 className="text-xs">$</h6> 25,000
            </h3>
          </div>
        </TableCell>
        <TableCell className="">
          {/* @todo: add new tag component here 
           <Tag
            text="Paid"
            iconName="doubleTick"
            color="#71F587"
            className="bg-[#005C0F] text-[#71F587]"
          /> */}
        </TableCell>
      </TableRow>
      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium">
          <AvatarLabelGroup
            avatarSrc="/projectLogo.jpeg"
            title="Superteam"
            subtitle="by @kash"
            size="md"
          />
        </TableCell>

        <TableCell>
          <div className="">
            <h3 className="flex items-end font-mono">
              <h6 className="text-xs">$</h6> 25,000
            </h3>
          </div>
        </TableCell>
        <TableCell className="">
          {/* @todo: add new tag component here 
           <Tag
            text="Pending"
            iconName="clock"
            color="#FFE45C"
            className="bg-[#5C4D00] text-[#FFE45C]"
          /> */}
        </TableCell>
      </TableRow>
    </>
  );
};
