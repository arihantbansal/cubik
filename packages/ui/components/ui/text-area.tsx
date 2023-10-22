import * as React from "react"
import {cn} from "../../lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    size: 'sm' | 'md'
    state: 'default' | 'focused' | 'hovered' | 'disabled' | 'error'
    resizable: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({className, ...props}, ref) => {
        return (
            <textarea
                className={cn(
                    "dark text-white flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                    `form-input-border=${props.state}`,
                    !props.resizable && "resize-none",
                    props.state === "error" && "border-red-500"
                )}
                ref={ref}
                disabled={props.state === "disabled"}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export {Textarea}
