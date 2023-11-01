import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';

import { Icon } from '../../../icons/icon';
import { cn } from '../../../lib/utils';

const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      className={cn(
        'text-[13px] leading-none  rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-[var(--form-input-fg-disabled)] data-[disabled]:pointer-events-none ',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute left-0 w-[16px] inline-flex items-center justify-center">
        <Icon
          className="stroke-[var(--form-input-fg-default)] fill-transparent "
          name="check"
        />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

SelectItem.displayName = 'SelectItem';
export { SelectItem };
