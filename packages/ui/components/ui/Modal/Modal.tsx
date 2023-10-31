import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { cn } from '../../../lib/utils';
import { HeadingSizeStyles, ModalHeader } from './ModalHeader';

const DialogSize = {
  sm: 'max-w-[320px]',
  md: 'max-w-[480px]',
  lg: 'max-w-[600px]',
};

interface Props {
  open: boolean;
  onClose: () => void;
  heading?: string;
  headingSize: keyof typeof HeadingSizeStyles;
  dialogSize: keyof typeof DialogSize;
  children: ReactNode | React.JSX.Element;
  // Icon component for heading
  IconComponent?: React.JSX.Element;

  // Ring SVG background for header
  RingSVG?: JSX.Element;
}
export const Modal = ({
  open,
  onClose,
  dialogSize = 'md',
  headingSize,
  children,
  IconComponent,
  RingSVG,
  heading,
}: Props) => {
  return (
    <>
      <Dialog.Root open={open}>
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={onClose}
            className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0"
          />
          <Dialog.Content
            className={cn(
              DialogSize[dialogSize],
              'text-white data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-full  overflow-scroll  translate-x-[-50%] translate-y-[-50%] rounded-[12px] bg-[var(--color-surface-primary)] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none',
            )}
          >
            <ModalHeader
              onClose={onClose}
              headingSize={headingSize}
              heading={heading || 'Heading'}
              IconComponent={IconComponent}
              RingSVG={RingSVG}
            />
            <Dialog.Content className="mb-5 p-5">{children}</Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
