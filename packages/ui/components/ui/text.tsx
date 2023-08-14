import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textVariants = cva("transition-colors", {
  variants: {
    fontSize: {
      "6xl": "text-6xl",
      "5xl": "text-5xl",
      "4xl": "text-4xl",
      "3xl": "text-3xl",
      "2xl": "text-2xl",
      xl: "text-xl",
      lg: "text-lg",
      md: "text-md",
      sm: "text-sm",
      xs: "text-xs",
    },
    noOfLines: {
      1: "truncate",
      2: "lines-2",
      3: "lines-3",
    },
  },
  defaultVariants: {
    fontSize: "md",
  },
});

type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    asChild?: boolean;
    as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

const Text = React.forwardRef<HTMLElement | null, TextProps>(
  ({ className, asChild = false, as: Tag = "p", ...props }, ref) => {
    const Comp = asChild ? Slot : Tag;
    return <Comp className={cn(textVariants({ className }))} {...props} />; // ref is missing here
  }
);

Text.displayName = "Text";

export { Text, textVariants };
