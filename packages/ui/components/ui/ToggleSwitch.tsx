import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'default';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  size = 'default',
}) => {
  const sizes = {
    default: {
      wrapper: 'w-14 h-8',
      box: 'h-8 w-14',
      thumb: 'w-7 h-7 top-0.5 left-0.5',
    },
    sm: {
      wrapper: 'w-10 h-6',
      box: 'h-6 w-10',
      thumb: 'w-5 h-5 top-0.5 left-0.5',
    },
    md: {
      wrapper: 'w-16 h-9',
      box: 'h-9 w-16',
      thumb: 'w-8 h-8 top-0.5 left-0.5',
    },
  };

  const bgColorClass = checked ? 'bg-blue-600' : 'bg-neutral-600';

  return (
    <div className="relative inline-block">
      <input
        id="toggleSwitch"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="opacity-0 absolute w-0 h-0"
      />
      <label
        htmlFor="toggleSwitch"
        className={`cursor-pointer block ${sizes[size].box} ${bgColorClass} rounded-full transition-colors duration-300 ease-in-out`}
      >
        <span
          className={`block absolute ${
            sizes[size].thumb
          } bg-white rounded-full transition-transform duration-300 ease-in-out ${
            checked ? 'translate-x-full' : ''
          }`}
        ></span>
      </label>
    </div>
  );
};

export { ToggleSwitch };
