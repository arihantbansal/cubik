import { Icon } from "../../../icons/icon";
import { cn } from "../../../lib/utils";
import React from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    shape?: 'square' | 'circle';
    withIcon?: boolean;
}

const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
    '2xl': "w-32 h-32",
    '3xl': "w-48 h-48",
};

const Avatar = React.forwardRef<HTMLButtonElement, AvatarProps>(
    ({ className, ...props }, ref) => {
    const roundedClass = props.shape === 'circle' ? 'rounded-full' : 'rounded-md';
    const size = props.size || 'md';
    const withIcon = props.withIcon || false;

    return (
        <div {...props} className={cn("bg-zinc-800 flex justify-center items-center relative border-2 border-gray-600 overflow-hidden rounded-xl", sizeClasses[size], roundedClass, className)}>
            <img src={props.src} alt={props.alt} className="object-cover w-full h-full z-5" />
            {withIcon && (
                <div className="absolute bottom-1 right-1 p-1 bg-zinc-800 border-2 border-gray-600 rounded-full z-200">
                    <Icon name="CircleDot" fill='#007BFF' stroke='#050505' className="w-2 h-2" />
                </div>
            )}
        </div>
    );
});

export { Avatar };    export type { AvatarProps };

