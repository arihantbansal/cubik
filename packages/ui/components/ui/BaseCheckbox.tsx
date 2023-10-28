import React from 'react';

import { Checkbox } from './Checkbox';

const variants = [
  { label: 'Default (Unchecked)', state: 'default', isChecked: false },
  { label: 'Default (Checked)', state: 'default', isChecked: true },
  {
    label: 'Default (Indeterminate)',
    state: 'default',
    isChecked: true,
    indeterminate: true,
  },
  { label: 'Hovered (Unchecked)', state: 'hover', isChecked: false },
  { label: 'Hovered (Checked)', state: 'hover', isChecked: true },
  {
    label: 'Hovered (Indeterminate)',
    state: 'hover',
    isChecked: true,
    indeterminate: true,
  },
  { label: 'Focused (Unchecked)', state: 'focus', isChecked: false },
  { label: 'Focused (Checked)', state: 'focus', isChecked: true },
  {
    label: 'Focused (Indeterminate)',
    state: 'focus',
    isChecked: true,
    indeterminate: true,
  },
  {
    label: 'Disabled (Unchecked)',
    state: 'default',
    isChecked: false,
    isDisabled: true,
  },
  {
    label: 'Disabled (Checked)',
    state: 'default',
    isChecked: true,
    isDisabled: true,
  },
  {
    label: 'Disabled (Indeterminate)',
    state: 'default',
    isChecked: true,
    isDisabled: true,
    indeterminate: true,
  },
];

const BaseCheckbox: React.FC = () => {
  return (
    <div className="w-[415px] h-auto relative rounded-[5px] border border-purple-500 p-4 grid grid-cols-2 gap-4">
      {['md', 'sm'].map((size) =>
        variants.map((variant) => (
          <CheckboxVariant
            key={`${size}-${variant.label}`}
            label={`${variant.label} ${size}`}
            size={size}
            {...variant}
          />
        )),
      )}
    </div>
  );
};

const CheckboxVariant: React.FC<CheckboxVariantProps> = ({
  label,
  size,
  isChecked,
  state,
  indeterminate,
  isDisabled,
}) => {
  return (
    <div
      className={`flex items-center ${
        state === 'hover' ? 'hover:bg-gray-200' : ''
      } ${state === 'focus' ? 'focus:bg-gray-300' : ''}`}
    >
      <Checkbox
        size={size}
        isChecked={isChecked}
        isDisabled={isDisabled}
        variant={indeterminate ? 'minus' : 'checked'}
      />
      <span className={`ml-4 ${isDisabled ? 'text-gray-400' : ''}`}>
        {label}
      </span>
    </div>
  );
};

interface CheckboxVariantProps {
  label: string;
  size: 'sm' | 'md';
  isChecked: boolean;
  state?: 'default' | 'hover' | 'focus';
  indeterminate?: boolean;
  isDisabled?: boolean;
}

export { BaseCheckbox };
