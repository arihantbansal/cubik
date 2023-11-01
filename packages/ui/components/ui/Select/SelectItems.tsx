import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { Icon } from '@ui/icons/icon';

import { cn } from '../../../lib/utils';

const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <RadixSelect.Item
      className={cn(
        'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <Icon name="cross" />
        {/* Change the icon to check */}
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

SelectItem.displayName = 'SelectItem';
export { SelectItem };
