'use client';

import React, { useState } from 'react';

import { cn } from '../../../lib/utils';

interface Props extends React.HTMLProps<HTMLInputElement> {
  name?: string;
  id?: string;
  placeholder?: string;
  isError?: boolean;
  variant?: 'md' | 'sm';
  setIsFocused?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputLeftElement = ({
  children,
  withBorder,
  isDisabled,
}: {
  children: React.ReactNode;
  withBorder: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <div
      className={cn(
        isDisabled
          ? 'text-[var(--form-input-fg-disabled)]'
          : 'text-[var(--form-input-fg-default)]',
        'inline-flex items-center rounded-l-[8px] px-3',
        withBorder && 'border-r  border-[var(--form-input-border-default)]',
      )}
    >
      {children}
    </div>
  );
};
export const InputRightElement = ({
  children,
  withBorder,
  isDisabled,
}: {
  children: React.ReactNode;
  withBorder?: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <div
      className={cn(
        isDisabled
          ? 'text-[var(--form-input-fg-disabled)]'
          : 'text-[var(--form-input-fg-default)]',
        'relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-[8px] px-3 py-2 text-sm font-semibold border-0 border-l-0',
        withBorder && 'border-r  border-[var(--form-input-border-default)]',
      )}
    >
      {children}
    </div>
  );
};

export const InputFieldContainer = ({
  children,
  isError,
  isDisabled,
  variant,
}: {
  children: React.ReactNode;
  isDisabled?: boolean;
  isError?: boolean;
  variant: 'md' | 'sm';
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking if the child is a valid element before cloning it to prevent errors
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        isError,
        isDisabled,
        isFocused,
        variant,
        setIsFocused,
        disabled: isDisabled,
      } as Partial<typeof child.props>);
    }
    return child;
  });
  return (
    <div
      className={cn(
        isDisabled && 'cursor-not-allowed',
        variant === 'md' ? 'h-[40px]' : 'h-[36px]',
        'mt-2 flex rounded-[8px] w-full',
        isError
          ? 'border-[var(--form-input-border-error)] bg-[var(--form-input-surface-error)] text-[var(--form-input-fg-error)]'
          : 'border-[var(--form-input-border-default)]',
        isFocused &&
          'border-[var(--form-input-border-focused)] bg-[var(--form-input-surface-focused)] text-[var(--form-input-fg-focused)]',
        isDisabled &&
          'border-[var(--form-input-border-disabled)] bg-[var(--form-input-surface-disabled)',
        'bg-[var(--form-input-surface-default)] hover:text-[var(--form-input-fg-hovered)] border-2  hover:border-[var(--form-input-border-hovered)] hover:bg-[var(--form-input-surface-hovered)',
      )}
    >
      {childrenWithProps}
    </div>
  );
};

export const InputField = (props: Props) => {
  const { id, name, isError = false, setIsFocused } = props;
  return (
    <>
      <input
        name={name}
        id={id}
        onFocus={() => !isError && setIsFocused && setIsFocused(true)}
        onBlur={() => !isError && setIsFocused && setIsFocused(false)}
        className={cn(
          'bg-[var(--form-input-surface-default)]',
          'disabled:text-[var(--form-input-fg-disabled)] disabled:cursor-not-allowed disabled:opacity-50 disabled:border-[var(--form-input-border-disabled)] disabled:bg-[var(--form-input-surface-disabled)',
          'block w-full flex-1 px-2 rounded-[8px] border-0 py-1.5 placeholder:px-2 placeholder:text-[var(--form-input-border-default)] outline-none',
        )}
        {...props}
      />
    </>
  );
};
