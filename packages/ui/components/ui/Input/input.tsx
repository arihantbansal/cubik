'use client';

import React, { useState } from 'react';

import { cn } from '../../../lib/utils';

interface Props {
  type: React.HTMLInputTypeAttribute;
  name: string;
  id: string;
  placeholder: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  isHttps?: boolean;
  isError?: boolean;
  size?: 'md' | 'sm';
  isDisabled?: boolean;
}
export const Input = ({
  type,
  id,
  name,
  placeholder,
  isHttps = true,
  isError = false,
  size = 'md',
  leftElement,
  rightElement,
  isDisabled,
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <>
      <div
        className={cn(
          isDisabled && 'cursor-not-allowed',
          size === 'md' ? 'h-[40px]' : 'h-[36px]',
          'mt-2 flex rounded-[8px]',
          isError
            ? 'border-[var(--form-input-border-error)] bg-[var(--form-input-surface-error)] text-[var(--form-input-fg-error)]'
            : 'border-[var(--form-input-border-default)]',
          isFocused &&
            'border-[var(--form-input-border-focused)] bg-[var(--form-input-surface-focused)] text-[var(--form-input-fg-focused)]',
          isDisabled &&
            'border-[var(--form-input-border-disabled)] bg-[var(--form-input-surface-disabled)',
          'hover:text-[var(--form-input-fg-hovered)] border-2  hover:border-[var(--form-input-border-hovered)] hover:bg-[var(--form-input-surface-hovered)',
        )}
      >
        {leftElement && (
          <div
            className={cn(
              isError && !isFocused
                ? 'border-[var(--form-input-border-error)] bg-[var(--form-input-surface-error)] text-[var(--form-input-fg-error)]'
                : 'border-[var(--form-input-border-default)] bg-[var(--form-input-surface-default)] text-[var(--form-input-fg-default)]',
              isFocused &&
                'border-[var(--form-input-border-focused)] bg-[var(--form-input-surface-focused)]',
              isDisabled &&
                'text-[var(--form-input-fg-disabled)] cursor-not-allowed  border-[var(--form-input-border-disabled)] bg-[var(--form-input-surface-disabled)',
              !leftElement
                ? 'hidden'
                : 'inline-flex items-center rounded-l-[8px] px-3 text-[var(--form-input-fg-default)]',
              isHttps &&
                'border-r-1 border border-[var(--form-input-border-default)]',
            )}
          >
            {leftElement}
          </div>
        )}
        <input
          type={type}
          name={name}
          id={id}
          disabled={isDisabled}
          placeholder={placeholder}
          onFocus={() => !isError && setIsFocused(true)}
          onBlur={() => !isError && setIsFocused(false)}
          value={JSON.stringify(isError)}
          className={cn(
            !isFocused &&
              'border-[var(--form-input-border-default)] bg-[var(--form-input-surface-default)] text-[var(--form-input-fg-default)]',
            isFocused &&
              'focus:border-[var(--form-input-border-focused)] bg-[var(--form-input-surface-focused)]',
            'disabled:text-[var(--form-input-fg-disabled)] disabled:cursor-not-allowed disabled:opacity-50 disabled:border-[var(--form-input-border-disabled)] disabled:bg-[var(--form-input-surface-disabled)',
            'block w-full flex-1 px-2 rounded-[8px] border-0 py-1.5 placeholder:px-2 placeholder:text-[var(--form-input-border-default)] outline-none',
          )}
        />
        {rightElement && (
          <div
            className={cn(
              isError && !isFocused
                ? 'border-[var(--form-input-border-error)]  bg-[var(--form-input-surface-error)] text-[var(--form-input-fg-error)]'
                : 'border-[var(--form-input-border-default)] bg-[var(--form-input-surface-default)] text-[var(--form-input-fg-default)]',
              isFocused &&
                'border-[var(--form-input-border-focused)] bg-[var(--form-input-surface-focused)]',
              isDisabled &&
                'text-[var(--form-input-fg-disabled)] cursor-not-allowed  border-[var(--form-input-border-disabled)] bg-[var(--form-input-surface-disabled)',
              !rightElement
                ? 'hidden'
                : 'relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-[8px] px-3 py-2 text-sm font-semibold border-0 border-l-0',
            )}
          >
            {rightElement}
          </div>
        )}
      </div>
    </>
  );
};
