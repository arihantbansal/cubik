import { cn } from "../../lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Icon } from "../../icons/icon";
import React from "react";

const inputLabelVariants = cva("transition-colors", {
  variants: {
    variant: {
      default: "text-[#808080]",
      error: "text-[#F53D6B]",
      icon: "flex items-center space-x-2",
    },
    fontSize: {
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      sm: "text-sm",
      xs: "text-xs",
    },
    fontWeight: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    fontSize: "md",
    fontWeight: "medium",
    variant: "icon",
  },
});

type InputLabelProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof inputLabelVariants> & {
    asChild?: boolean;
    as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

const InputLabel = forwardRef<HTMLSpanElement, InputLabelProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        className={cn(
          inputLabelVariants({ className }),
          "flex items-center space-x-2"
        )}
        {...props}
        ref={ref}
      >
        <Icon
          name="infoCircle"
          stroke="#808080"
          fill="none"
          height={16}
          width={16}
        />
        {children}
      </span>
    );
  }
);

InputLabel.displayName = "InputLabel";

export { InputLabel, inputLabelVariants };
