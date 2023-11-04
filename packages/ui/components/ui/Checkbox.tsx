'use client';

import React, { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { Icon } from '../../icons/icon';
import { cn } from '../../lib/utils';

const checkboxVariant = cva('flex p-2 rounded appearance-none border', {
  variants: {
    state: {
      default:
        'bg-[var(--form-checkbox-surface-default)] border-[var(--form-checkbox-border-default)] checked:bg-[var(--form-checkbox-surface-default-checked)] checked:border-[var(--form-checkbox-surface-default-checked)]',
      hovered:
        'bg-[var(--form-checkbox-surface-hovered)] border-[var(--form-checkbox-border-hovered)] checked:bg-[var(--form-checkbox-surface-default-checked)] checked:border-[var(--form-checkbox-surface-hovered-checked)]',
      focused:
        'bg-[var(--form-checkbox-surface-default)] border-[var(--color-neutral-300] shadow-[0_0_0_2px_rgba(56,152,255,1)] checked:bg-[var(--form-checkbox-surface-default-checked)] checked:border-[var(--form-checkbox- --form-checkbox-border-focused)]',
      disabled:
        'bg-[var(--form-checkbox-surface-disabled)] border-[var(--form-checkbox-border-disabled)]',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'md',
  },
});

interface CheckboxProps extends VariantProps<typeof checkboxVariant> {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  indetermined: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  defaultChecked = false,
  onChange,
  size = 'md',
  state = 'default',
  indetermined,
  ...props
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  console.log('checked', checked);
  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <div className="flex h-6 items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className={cn(checkboxVariant({ size, state }))}
        {...props}
      />
      <span className="absolute pl-1">
        {checked && (
          <Icon
            name={`${indetermined ? 'minus' : 'tick'}`}
            fill="none"
            stroke={`${state === 'disabled' ? '#fff' : '#050505'}`}
            height={14}
            width={14}
          />
        )}
      </span>
    </div>
  );
};

export { Checkbox };
