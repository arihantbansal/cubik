import React, { useState, useEffect } from "react";

interface CheckboxProps {
    isChecked: boolean | 'minus';
    onChange: (value: boolean | 'minus') => void;
    isDisabled?: boolean;
    variant?: 'checked' | 'minus';
    size?: 'md' | 'sm';
}

const Checkbox: React.FC<CheckboxProps> = ({
    isChecked: propIsChecked,
    onChange,
    isDisabled = false,
    variant = 'checked',
    size = 'md'
}) => {
    const [isChecked, setIsChecked] = useState(propIsChecked);

    useEffect(() => {
        setIsChecked(propIsChecked);
    }, [propIsChecked]);

    const handleToggle = () => {
        if (isDisabled) return;

        if (isChecked === false) {
            onChange(variant === 'checked' ? true : 'minus');
        } else {
            onChange(false);
        }
    };

    const styles = {
        md: {
            container: 'w-5 h-5',
            mark: 'w-3.5 h-3.5'
        },
        sm: {
            container: 'w-4 h-4',
            mark: 'w-2.5 h-2.5'
        }
    };

    const currentStyle = styles[size];

    const MinusSVG: React.FC<{ className?: string }> = ({ className }) => (
        <svg width="12" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect width="100%" height="100%" fill="white" />
        </svg>
    );



    return (
        <div
            tabIndex={0}
            role="checkbox"
            aria-checked={isChecked}
            className={`${currentStyle.container} p-2 relative rounded 
                        ${isChecked === true ? 'bg-blue-600 border-blue-600' :
                    isChecked === 'minus' ? 'bg-neutral-600 border-neutral-600' :
                        'bg-zinc-800 border-zinc-800'} 
                        ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} 
                        focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={handleToggle}
        >
            {isChecked === true && (
                <svg className={`${currentStyle.mark} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            )}
            {isChecked === 'minus' && <MinusSVG className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />}
        </div>
    );
}

export { Checkbox };