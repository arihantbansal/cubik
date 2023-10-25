import { AvatarGroup, AvatarLabelGroup, TableCell, TableRow } from "@cubik/ui";
import Tag from "@cubik/ui/components/ui/tag";
import React from "react";

export const TransactionsTableRows = () => {
  return (
    <>
      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium">
          <AvatarLabelGroup
            avatarSrc={[
              { src: "/projectLogo.jpeg", alt: "Description 1" },
              { src: "/dhruvAvatar.jpeg", alt: "Description 2" },
            ]}
            shape="square"
            title="2 Assets"
            description="$320"
            size="sm"
            variant={1}
          />
        </TableCell>

        <TableCell>
          <Tag
            text="Executed"
            iconName="doubleTick"
            color="#000"
            className="bg-green-500 text-black"
          />
        </TableCell>
        <TableCell className="">
          <p className="flex tracking-widest text-neutral-500">
            <p className="text-white">3</p>/4
          </p>
        </TableCell>
        <TableCell>
          <AvatarLabelGroup
            avatarSrc="/projectLogo.jpeg"
            shape="square"
            title="dreader"
            size="xs"
            variant={1}
          />
        </TableCell>
      </TableRow>

      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium">
          <AvatarLabelGroup
            avatarSrc={[
              { src: "/projectLogo.jpeg", alt: "Description 1" },
              { src: "/dhruvAvatar.jpeg", alt: "Description 2" },
            ]}
            shape="square"
            title="2 Assets"
            description="$320"
            size="sm"
            variant={1}
          />
        </TableCell>

        <TableCell>
          <Tag
            text="Pending"
            iconName="spinner"
            color="#000"
            className="bg-[#F5D431] text-black"
          />
        </TableCell>
        <TableCell className="">
          <p className="flex tracking-widest text-neutral-500">
            <p className="text-white">1</p>/4
          </p>
        </TableCell>
        <TableCell>
          <AvatarLabelGroup
            avatarSrc="/projectLogo.jpeg"
            shape="square"
            title="dreader"
            size="xs"
            variant={1}
          />
        </TableCell>
      </TableRow>

      <TableRow className="hover:bg-surface-neutral-820">
        <TableCell className="font-medium">
          <AvatarLabelGroup
            avatarSrc={[
              { src: "/projectLogo.jpeg", alt: "Description 1" },
              { src: "/dhruvAvatar.jpeg", alt: "Description 2" },
            ]}
            shape="square"
            title="2 Assets"
            description="$320"
            size="sm"
            variant={1}
          />
        </TableCell>

        <TableCell>
          <Tag
            text="Failed"
            iconName="danger"
            color="#fff"
            className="bg-red-500 text-white"
          />
        </TableCell>
        <TableCell className="">
          <p className="flex tracking-widest text-neutral-500">
            <p className="text-white">3</p>/4
          </p>
        </TableCell>
        <TableCell>
          <AvatarLabelGroup
            avatarSrc="/projectLogo.jpeg"
            shape="square"
            title="dreader"
            size="xs"
            variant={1}
          />
        </TableCell>
      </TableRow>
    </>
  );
};
