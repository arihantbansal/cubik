import React from "react";
import { AvatarProps, Avatar } from "./Avatar";
import { cn } from "../../../lib/utils";

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  shape?: "circle" | "square";
  maxCount?: number;
}

const sizeToSpacingClass = {
  xs: "-space-x-3",
  sm: "-space-x-4",
  md: "-space-x-6",
  lg: "-space-x-8",
  xl: "-space-x-10",
  "2xl": "-space-x-16",
  "3xl": "-space-x-20",
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = "md",
  shape = "circle",
  maxCount = 3,
}) => {
  const overflowCount = avatars.length > 3 ? true : false;

  return (
    <div className="flex items-center gap-2">
      <div className={cn("flex relative", sizeToSpacingClass[size])}>
        {avatars.slice(0, maxCount).map((avatar, index) => (
          <Avatar
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            size={size}
            shape={shape}
          />
        ))}
      </div>
      {overflowCount && (
        <span className="flex items-end p-0.5 justify-end bg-gray-500  text-white text-xs font-medium rounded-full">
          +{avatars.length - 3}
        </span>
      )}
    </div>
  );
};
