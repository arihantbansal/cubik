'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';

import { Icon } from '@cubik/ui';

type Props = {
  isAcceptDialogOpen: boolean;
  setIsAcceptDialogOpen: (value: boolean) => void;
};

const AcceptProjectModal = ({
  isAcceptDialogOpen,
  setIsAcceptDialogOpen,
}: Props) => {
  const [checked, setChecked] = React.useState(false);
  console.log('first');
  return (
    <Dialog.Root open={isAcceptDialogOpen}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 bg-[rgba(0,0,0,0.7)]" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-900  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="top-0 flex h-12 items-center space-x-6 rounded-t-md bg-neutral-600 text-base font-medium text-black">
            <svg
              className="absolute left-0 top-0 "
              xmlns="http://www.w3.org/2000/svg"
              width="106"
              height="48"
              viewBox="0 0 106 55"
              fill="none"
            >
              <g clip-path="url(#clip0_494_6574)">
                <rect
                  opacity="0.4"
                  x="12.5"
                  y="3.5"
                  width="47"
                  height="47"
                  rx="23.5"
                  stroke="#45F562"
                />
                <rect
                  opacity="0.5"
                  x="18.5"
                  y="9.5"
                  width="35"
                  height="35"
                  rx="17.5"
                  stroke="#45F562"
                />
                <rect
                  opacity="0.3"
                  x="5.5"
                  y="-3.5"
                  width="61"
                  height="61"
                  rx="30.5"
                  stroke="#45F562"
                />
                <rect
                  opacity="0.2"
                  x="-1.5"
                  y="-10.5"
                  width="75"
                  height="75"
                  rx="37.5"
                  stroke="#45F562"
                />
                <rect
                  opacity="0.1"
                  x="-7.5"
                  y="-16.5"
                  width="87"
                  height="87"
                  rx="37.5"
                  stroke="#45F562"
                />
              </g>
              <defs>
                <clipPath id="clip0_494_6574">
                  <rect
                    width="118"
                    height="55"
                    fill="white"
                    transform="translate(-12)"
                  />
                </clipPath>
              </defs>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="#45F562"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m8.073 11.012 4.013 4.01a21.936 21.936 0 0 1 8.692-9.393L21 5.5m-5-1.563a9 9 0 1 0 4.842 6.376"
              />
            </svg>
            <p className="text-xl text-white">Accept Application</p>
          </Dialog.Title>
          <Dialog.Description className="px-6 py-4 text-xs leading-normal  text-gray-500">
            <p>
              By Rejecting a grant application the project will no longer be
              able to participate in the grant round. This will send a email to
              the project notifying them about the rejection.
            </p>
          </Dialog.Description>
          <div className="flex flex-col items-center p-6">
            <div className="flex w-full items-center justify-between">
              <label
                className="text-md font-light leading-none text-white"
                htmlFor="airplane-mode"
              >
                Send Custom Email
              </label>
              <Switch.Root
                className="bg-blackA6 shadow-blackA4 relative h-[25px] w-[42px] cursor-default rounded-full shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black"
                id="airplane-mode"
                onCheckedChange={(newChecked) => setChecked(newChecked)}
              >
                <Switch.Thumb className="shadow-blackA4 block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
            </div>
            {checked && (
              <div className="w-full pt-4">
                <div className="space-y-4">
                  <fieldset className=" flex flex-col items-center gap-2">
                    <label className="w-full" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-neutral-600 px-4 py-2 "
                      id="subject"
                      placeholder="Subject for Email"
                    />
                  </fieldset>
                  <fieldset className=" flex flex-col items-center gap-2">
                    <label className="w-full" htmlFor="body">
                      Body
                    </label>
                    <input
                      className="inline-flex w-full flex-1 items-center justify-center rounded-md bg-neutral-600 px-4 py-2 "
                      id="body"
                      placeholder="Email body"
                    />
                  </fieldset>
                </div>
              </div>
            )}
            <div className=" mt-8 flex w-full justify-end">
              <Dialog.Close asChild>
                <button className="w-full items-center justify-center rounded-lg bg-green-500 py-2 font-medium text-black focus:shadow-[0_0_0_2px] focus:outline-none">
                  Sign Transaction
                </button>
              </Dialog.Close>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex  appearance-none items-center justify-center rounded-full focus:border-none focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => setIsAcceptDialogOpen(false)}
            >
              <Icon name="cross" height={18} width={18} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AcceptProjectModal;
