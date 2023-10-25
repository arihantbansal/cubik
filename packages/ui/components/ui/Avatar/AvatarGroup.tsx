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
  const overflowCount = avatars.length - maxCount;

  return (
    <div className={cn("flex -space-x-4", sizeToSpacingClass[size])}>
      {avatars.slice(0, maxCount).map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
          shape={shape}
          withIcon={avatar.withIcon}
        />
      ))}
      {overflowCount > 0 && (
        <span className="inline-flex items-center justify-center bg-gray-500 text-white text-xs font-medium rounded-full">
          +{overflowCount}
        </span>
      )}
    </div>
  );
};
