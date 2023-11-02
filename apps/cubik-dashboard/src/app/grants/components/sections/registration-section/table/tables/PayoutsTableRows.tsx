import React from 'react';

import {
  AvatarGroup,
  AvatarLabelGroup,
  TableCell,
  TableRow,
  Tag,
} from '@cubik/ui';

export const PayoutsTableRows = () => {
  return (
    <>
      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium">
          <AvatarLabelGroup
            avatarSrc="/projectLogo.jpeg"
            title="Superteam"
            subtitle="by @kash"
            size="md"
            shape="square"
          />
        </TableCell>

        <TableCell>29%</TableCell>
        <TableCell className="">
          <p className="flex tracking-widest">$12,596.6</p>
        </TableCell>
        <TableCell>
          {/* // @todo: add new tag component here
                <Tag
            text="Executed"
            iconName="doubleTick"
            color="#000"
            className="bg-green-500 text-black"
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
            shape="square"
          />
        </TableCell>

        <TableCell>29%</TableCell>
        <TableCell className="">
          <p className="flex tracking-widest">$12,596.6</p>
        </TableCell>
        <TableCell>
          {/* // @todo: add new tag component here
                 <Tag
            text="Not Executed"
            iconName="spinner"
            color="#000"
            className="bg-[#F5D431] text-black"
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
            shape="square"
          />
        </TableCell>

        <TableCell>29%</TableCell>
        <TableCell className="">
          <p className="flex tracking-widest">$12,596.6</p>
        </TableCell>
        <TableCell>
          {/* // @todo: add new tag component here
          <Tag
            text="Not Signed"
            iconName="clock"
            color="#fff"
            className="bg-blue-500 text-white"
          /> */}
        </TableCell>
      </TableRow>
    </>
  );
};
