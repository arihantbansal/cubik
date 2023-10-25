import React from 'react';
import { Icon } from "../../../icons/icon";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import { iconLibrary } from "../../../icons/iconLibrary";
interface TitleWithIconProps {
  text: string;
  icon?: keyof typeof iconLibrary;
  variant?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

const titleVariants = cva<"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl">({
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
});

const TitleWithIcon: React.FC<TitleWithIconProps> = ({
  text,
  icon,
  variant = "md",
}) => {
  const classes = titleVariants({ [variant]: true });

  return (
    <div className={cn("flex items-center gap-2", classes)}>
      <p>{text}</p>
      {icon && <Icon name={icon} fill="#007BFF" stroke="#1F1F1F" />}
    </div>
  );
};

export default TitleWithIcon;
