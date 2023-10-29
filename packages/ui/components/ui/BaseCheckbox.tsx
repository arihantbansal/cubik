import React from 'react';

import { Checkbox } from './Checkbox';

type Variant = {
  label: string;
  state: 'default' | 'hover' | 'focus';
  isChecked: boolean;
  indeterminate?: boolean;
  isDisabled?: boolean;
};

const variants: Array<Omit<CheckboxVariantProps, 'size' | 'label'>> = [
  { state: 'default', isChecked: false },
  { state: 'default', isChecked: true },
  { state: 'default', isChecked: true, indeterminate: true },
  { state: 'hover', isChecked: false },
  { state: 'hover', isChecked: true },
  { state: 'hover', isChecked: true, indeterminate: true },
  { state: 'focus', isChecked: false },
  { state: 'focus', isChecked: true },
  { state: 'focus', isChecked: true, indeterminate: true },
  { state: 'default', isChecked: false, isDisabled: true },
  { state: 'default', isChecked: true, isDisabled: true },
  { state: 'default', isChecked: true, isDisabled: true, indeterminate: true },
];

const BaseCheckbox: React.FC = () => {
  return (
    <div className="w-[415px] h-auto relative rounded-[5px] border border-purple-500 p-4 grid grid-cols-2 gap-4">
      {(['md', 'sm'] as const).map((size) =>
        variants.map((variantProps) => {
          let labelState = variantProps.isChecked ? 'Checked' : 'Unchecked';
          if (variantProps.indeterminate) labelState = 'Indeterminate';
          const variantLabel = `${
            variantProps.state.charAt(0).toUpperCase() +
            variantProps.state.slice(1)
          } (${labelState})`;

          return (
            <CheckboxVariant
              key={`${size}-${variantLabel}`}
              label={`${variantLabel} ${size}`}
              size={size}
              {...variantProps}
            />
          );
        }),
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
        onChange={function (value: boolean | 'minus'): void {
          throw new Error('Function not implemented.');
        }}
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
  state: 'default' | 'hover' | 'focus';
  indeterminate?: boolean;
  isDisabled?: boolean;
}

export { BaseCheckbox };
