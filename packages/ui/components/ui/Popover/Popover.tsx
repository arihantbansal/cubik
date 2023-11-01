import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';

import { Icon } from '../../../icons/icon';

interface Props {
  children: React.JSX.Element;
}
export const Popover = ({ children }: Props) => {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger className="w-10">
        <button
          className="px-5 py-2 inline-flex items-center justify-center text-(--color-fg-primary) bg-white cursor-default outline-none"
          aria-label="Update dimensions"
        >
          Hello
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade">
          {children}
          <RadixPopover.Close
            className=" inline-flex items-center justify-center  absolute top-[5px] right-[5px]  focus:shadow-[0_0_0_2px] focus:shadow-violet7  cursor-default"
            aria-label="Close"
          >
            <Icon name="Cross" />
          </RadixPopover.Close>
          <RadixPopover.Arrow className="fill-[var(--white)]" />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
