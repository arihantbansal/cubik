import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputFieldVariants = cva(
  "flex items-center border rounded",
  {
    variants: {
      inputSize: {
        sm: "text-sm p-1",
        md: "text-base p-2",
      },
      state: {
        default: "bg-gray-800 border-gray-800",
      },
      placeholderVariant: {
        true: "text-neutral-600 font-[Inter] leading-normal",
        false: "",
      },
      leftElement: {
        true: "text-white font-[Inter] leading-normal mr-2",
        false: "",
      },
      rightElement: {
        true: "text-white font-[Inter] leading-normal ml-2",
        false: "",
      },
    },
    defaultVariants: {
      inputSize: "md",
      state: "default",
      placeholderVariant: true,
      leftElement: true,
      rightElement: true,
    },
  }
);

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputFieldVariants> {
  leftElementContent?: string;
  rightElementContent?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    className,
    inputSize,
    state,
    placeholderVariant,
    leftElement,
    rightElement,
    leftElementContent = "USDC",
    rightElementContent = "https://",
    ...inputProps
  }, ref) => {
    const { children, dangerouslySetInnerHTML, ...filteredInputProps } = inputProps;

    return (
      <div className={cn(inputFieldVariants({ inputSize, state, placeholderVariant, leftElement, rightElement, className }))}>
        {leftElement && <span>{leftElementContent}</span>}
        <input 
          type="text" 
          ref={ref} 
          className="bg-transparent flex-grow"
          {...filteredInputProps} 
        />
        {rightElement && <span>{rightElementContent}</span>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export { InputField, inputFieldVariants };
