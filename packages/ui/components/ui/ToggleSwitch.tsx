'use client';

import React, { ReactNode, useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const toggleVariants = cva(
  'flex items-start p-[0.125rem] pl-0 bg-[var(--form-switch-surface-default-off)] border border-[var(--form-switch-border-default-off)] rounded-full relative data-[state=checked]:bg-[var(--form-switch-surface-default-on)] outline-none cursor-default data-[state=checked]:border-[var(--form-switch-border-default-on)]',
  {
    variants: {
      size: {
        sm: 'w-9',
        md: 'w-11',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const thumbVariants = cva(
  'block bg-[var(--form-switch-button-default-on)] rounded-full transition-transform duration-100 translate-x-[0.125rem] will-change-transform',
  {
    variants: {
      size: {
        sm: 'w-[14px] h-[14px] data-[state=checked]:translate-x-[calc(2.25rem-14px-2*0.125rem)]',
        md: 'w-[18px] h-[18px] data-[state=checked]:translate-x-[calc(2.75rem-18px-2*0.125rem)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const spacingVariants = cva('flex items-start gap-4', {
  variants: {
    variant: {
      default: '',
      extended: 'justify-between flex-row-reverse',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface ToggleProps
  extends VariantProps<typeof toggleVariants>,
    VariantProps<typeof spacingVariants> {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  children?: ReactNode;
}

const ToggleSwitch: React.FC<ToggleProps> = ({
  defaultChecked = false,
  onChange,
  size,
  children,
  variant = 'default',
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div className={cn(spacingVariants({ variant }))}>
      <Switch.Root
        checked={checked}
        onCheckedChange={handleToggle}
        className={cn(toggleVariants({ size }))}
      >
        <Switch.Thumb className={cn(thumbVariants({ size }))} />
      </Switch.Root>
      <div className="gap-3 flex items-end h-full ">
        {children && <div className="">{children}</div>}
      </div>
    </div>
  );
};

export { ToggleSwitch };
