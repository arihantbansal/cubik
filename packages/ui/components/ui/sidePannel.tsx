"use client";
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: React.JSX.Element;
};

const DialogPrimitive = Transition.Root;

const SidePannel = ({ open, setOpen, children, ...props }: Props) => {
  return (
    <DialogPrimitive show={open}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md h-full">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </DialogPrimitive>
  );
};

export { SidePannel };
