import React, { useState } from 'react';

import { Checkbox } from './Checkbox';
import { InputLabel } from './inputLabel';

interface CheckboxItem {
  id: string;
  label: string;
  isChecked: boolean;
  isDisabled?: boolean;
  indeterminate?: boolean;
}

interface BaseCheckboxGroupProps {
  items: CheckboxItem[];
  onChange: (updatedItems: CheckboxItem[]) => void;
}

export const BaseCheckboxGroup: React.FC<BaseCheckboxGroupProps> = ({
  items,
  onChange,
}) => {
  const [checkboxItems, setCheckboxItems] = useState<CheckboxItem[]>(items);

  const handleCheckboxChange = (
    id: string,
    updatedState: boolean | 'minus',
  ) => {
    const updatedItems = checkboxItems.map((item) =>
      item.id === id ? { ...item, isChecked: updatedState } : item,
    );
    setCheckboxItems(updatedItems);
    onChange(updatedItems);
  };

  return (
    <div>
      {checkboxItems.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 mb-2">
          <Checkbox
            isChecked={item.isChecked}
            isDisabled={item.isDisabled}
            variant={item.indeterminate ? 'minus' : 'checked'}
            onChange={(state) => handleCheckboxChange(item.id, state)}
          />
          <InputLabel>{item.label}</InputLabel>
        </div>
      ))}
    </div>
  );
};
