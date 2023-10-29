"use client";
import React, { useState } from 'react';
import { Icon } from '../../icons/icon';
import { AvatarLabelGroup } from './Avatar/AvatarLabelGroup';
import { Button } from './button';

interface DropdownProps {
  colorScheme?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  colorScheme = 'primary',
  size = 'md',
  dark = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorClasses = {
    primary:
      'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    secondary:
      'text-black bg-gray-300 hover:bg-gray-400 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-500',
    danger:
      'text-white bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-400',
    success:
      'text-white bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-400',
  };

  const linkClasses = {
    primary: 'hover:bg-blue-100 dark:hover:bg-blue-800',
    secondary: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    danger: 'hover:bg-red-100 dark:hover:bg-red-700',
    success: 'hover:bg-green-100 dark:hover:bg-green-700',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-6 py-3',
  };

  const darkBackground = dark
    ? 'bg-opacity-80 bg-black backdrop-blur-[10px]'
    : 'bg-white';

  return (
    <div className="relative inline-block z-20">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`focus:ring-4 focus:outline-none font-medium rounded-[10px] ${sizeClasses[size]} ${colorClasses[colorScheme]}`}
      >
        Dropdown button
        <Icon
          name={isOpen ? 'chevronUp' : 'chevronDown'}
          stroke="currentColor"
          fill="none"
          height={16}
          width={16}
        />
      </Button>

      {isOpen && (
        <div
          className={`z-20 divide-y divide-gray-100 rounded-[15px] shadow w-44 ${darkBackground} absolute mt-2 rounded-[20px]`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 rounded-[50px]">
            <li className="px-4 py-2 rounded-t-[20px]">
              <AvatarLabelGroup
                avatarSrc="path_to_avatar_image"
                title="John Doe"
                subtitle="Software Developer"
                description="5 years of experience"
                size="md"
                variant={1}
              />
            </li>
            <li>
              <a
                href="#"
                className={`block px-4 py-2 ${linkClasses[colorScheme]} rounded-[15px]`}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block px-4 py-2 ${linkClasses[colorScheme]} rounded-[15px]`}
              >
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block px-4 py-2 ${linkClasses[colorScheme]} rounded-[15px]`}
              >
                Earnings
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`block px-4 py-2 ${linkClasses[colorScheme]} rounded-b-[15px]`}
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export { Dropdown };
