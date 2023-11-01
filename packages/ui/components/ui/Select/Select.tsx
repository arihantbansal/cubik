import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';

import { Icon } from '../../../icons/icon';
import { cn } from '../../../lib/utils';

const Select = RadixSelect.Root;

const SelectGroup = RadixSelect.Group;

const SelectValue = RadixSelect.Value;

type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixSelect.Trigger
> & {
  isError?: boolean;
  size?: 'md' | 'sm';
};
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  SelectTriggerProps
>(({ className, isError = false, size = 'md', children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(
      isError
        ? 'border-[var(--form-input-border-error)] bg-[var(--form-input-surface-error)] text-[var(--form-input-fg-error)]'
        : 'border-[var(--form-input-border-default)] bg-[var(--form-input-surface-default)] text-[var(--form-input-fg-default)]',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-[var(--form-input-border-focused)] focus:bg-[var(--form-input-surface-focused)]',
      'disabled:text-[var(--form-input-fg-disabled)] disabled:cursor-not-allowed disabled:opacity-50 disabled:border-[var(--form-input-border-disabled)] disabled:bg-[var(--form-input-surface-disabled)',
      'hover:text-[var(--form-input-fg-hovered)] hover:border-[var(--form-input-border-hovered)] hover:bg-[var(--form-input-surface-hovered)',
      'flex  w-full items-center justify-between border-2',
      'rounded-[8px]',
      size === 'md'
        ? 'h-[40px] text-[16px] px-[16px] py-[12px]'
        : 'h-[36px] text-[12px] p-[12px]',
      className,
    )}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <Icon
        name="chevronDown"
        className="h-4 w-4 opacity-50 text-[var(--form-input-fg-default)] fill-transparent  disabled:text-[var(--form-input-fg-disabled)]"
      />
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = RadixSelect.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden text-[var(--form-input-fg-default)] rounded-[8px] border border-[var(--form-input-border-default)] bg-[var(--form-input-surface-default)]  shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <RadixSelect.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = RadixSelect.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Label>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Label>
>(({ className, ...props }, ref) => (
  <RadixSelect.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = RadixSelect.Label.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
};
