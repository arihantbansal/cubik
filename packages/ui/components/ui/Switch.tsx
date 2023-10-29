"use client";
import React, { useState } from 'react';
import { HelperText } from './helperText';
import { InputLabel } from './inputLabel';
import { ToggleSwitch } from './ToggleSwitch';

interface SwitchProps {
  labelText?: string;
  helperText?: string;
  iconVariant?: 'info' | 'warning' | 'error' | 'default';
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'default';
  required?: boolean;
}

const Switch: React.FC<SwitchProps> = ({
  labelText,
  helperText,
  iconVariant = 'default',
  checked: propsChecked = false,
  onChange,
  size = 'default',
  required = false,
}) => {
  // Introduce local state to manage checked status
  const [checked, setChecked] = useState<boolean>(propsChecked);

  // Handle toggle switch change
  const handleToggleChange = (isChecked: boolean) => {
    setChecked(isChecked); // Update local state
    onChange && onChange(isChecked); // Invoke parent's onChange if provided
  };

  const fontSize = size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'default';

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        // @ts-ignore
        <InputLabel size={size} required={required} variant={iconVariant}>
          {labelText}
        </InputLabel>
      )}
      <div className="flex items-center gap-4">
        <ToggleSwitch
          checked={checked}
          onChange={handleToggleChange}
          size={size}
        />
        {helperText && (
          <HelperText
            variant="default"
            // @ts-ignore
            fontSize={fontSize}
          >
            {helperText}
          </HelperText>
        )}
      </div>
    </div>
  );
};

export { Switch };
