import { cn } from "@ui/lib/utils";
import * as React from "react"
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
    selected: boolean;
    text: string;
}

const Tag = React.forwardRef<HTMLButtonElement, Props>(
    ({ className, ...props }, ref) => {
        return (
            <button {...props} className={cn("relative rounded-[100px] overflow-hidden shrink-0 flex flex-row items-center justify-center py-1 px-3 box-border text-center text-[12px] text-tag-solid-text-tag-solid-text-blue", props.selected ? "bg-tag-solid-surface-tag-solid-surface-blue" : "bg-tag-subtle-surface-tag-subtle-surface-default")}>
                <div className="flex flex-row items-center justify-center p-1">
                    <div className="relative leading-[16px] font-medium">{props.text}</div>
                </div>
            </button>
        );
    });

export { Tag };
export type { Props as TagProps };

