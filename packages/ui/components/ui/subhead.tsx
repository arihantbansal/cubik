import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  endElement?: React.ReactNode;
}

const Subhead = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...props}
        className="w-full relative flex flex-row items-center justify-between py-3 px-4 box-border text-left text-5xl text-sub-heads-subhead-fg-primary font-display-xs-600"
      >
        <div className="flex flex-row items-center justify-start">
          <div className="relative leading-[32px] text-3xl font-semibold">
            {props.text}
          </div>
        </div>
        {props.endElement && (
          <div className="w-[294.33px] flex flex-row items-center justify-end">
            {props.endElement}
          </div>
        )}
      </div>
    );
  }
);

export default Subhead;
