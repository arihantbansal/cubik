import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { cn } from '../../../lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode | React.JSX.Element;
  drawerSize: keyof typeof DrawerSize;
  drawerPosition: keyof typeof DrawerPosition;
  className?: string;
}

const DrawerSize = {
  sm: 'max-w-[320px]',
  md: 'max-w-[480px]',
  lg: 'max-w-[600px]',
  max: '',
};
const DrawerPosition = {
  bottom: 'bottom-0 max-h-[85vh]',
  right: 'right-0 top-0 min-h-screen',
  left: 'left-0 top-0 min-h-screen',
};
export const Drawer = ({
  onClose,
  open,
  children,
  // handles the width for drawer
  drawerSize = 'md',

  // handles the position for drawer
  drawerPosition = 'right',
  className,
}: Props) => {
  return (
    <>
      <Dialog.Root open={open}>
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={onClose}
            className="bg-black/50  fixed inset-0"
          />
          <Dialog.Content
            className={cn(
              'text-white  fixed  w-full  bg-[var(--color-surface-primary)] dark:bg-[var(--color-bg-tertiary)]  focus:outline-none',
              DrawerPosition[drawerPosition],
              DrawerSize[drawerSize],
            )}
          >
            <Dialog.Content className={className}>{children}</Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
