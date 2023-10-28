'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';

import { Icon } from '@cubik/ui';

type Props = {
  isDeclineDialogOpen: boolean;
  setIsDeclineDialogOpen: (value: boolean) => void;
};

const DeclineProjectModal = ({
  isDeclineDialogOpen,
  setIsDeclineDialogOpen,
}: Props) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <Dialog.Root open={isDeclineDialogOpen}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0 bg-[rgba(0,0,0,0.7)]" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-900  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="top-0 flex  h-12 items-center  space-x-6 rounded-t-md bg-neutral-600 text-base font-medium text-black">
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
                  stroke="#F53D6B"
                />
                <rect
                  opacity="0.5"
                  x="18.5"
                  y="9.5"
                  width="35"
                  height="35"
                  rx="17.5"
                  stroke="#F53D6B"
                />
                <rect
                  opacity="0.3"
                  x="5.5"
                  y="-3.5"
                  width="61"
                  height="61"
                  rx="30.5"
                  stroke="#F53D6B"
                />
                <rect
                  opacity="0.2"
                  x="-1.5"
                  y="-10.5"
                  width="75"
                  height="75"
                  rx="37.5"
                  stroke="#F53D6B"
                />
                <rect
                  opacity="0.1"
                  x="-7.5"
                  y="-16.5"
                  width="87"
                  height="87"
                  rx="37.5"
                  stroke="#F53D6B"
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
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
            >
              <path
                d="M14.5917 15.5833C14.5917 16.3657 13.9574 17 13.175 17C12.3926 17 11.7584 16.3657 11.7584 15.5833C11.7584 14.8009 12.3926 14.1666 13.175 14.1666C13.9574 14.1666 14.5917 14.8009 14.5917 15.5833Z"
                stroke="#F53D6B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M22.2417 15.5833C22.2417 16.3657 21.6074 17 20.825 17C20.0426 17 19.4084 16.3657 19.4084 15.5833C19.4084 14.8009 20.0426 14.1666 20.825 14.1666C21.6074 14.1666 22.2417 14.8009 22.2417 15.5833Z"
                stroke="#F53D6B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.08337 14.1667C7.08337 8.68985 11.5232 4.25 17 4.25C22.4769 4.25 26.9167 8.68984 26.9167 14.1667V20.4267C26.9167 21.7644 26.0607 22.952 24.7917 23.375C23.5227 23.798 22.6667 24.9856 22.6667 26.3233V26.4569C22.6667 28.2756 21.1923 29.75 19.3736 29.75H14.6265C12.8078 29.75 11.3334 28.2756 11.3334 26.4569V26.3233C11.3334 24.9856 10.4774 23.798 9.20837 23.375C7.93934 22.952 7.08337 21.7644 7.08337 20.4267V14.1667Z"
                stroke="#F53D6B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-xl text-white">Reject Application</p>
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
                <button className="w-full items-center justify-center rounded-lg bg-red-500 py-2 font-medium focus:shadow-[0_0_0_2px] focus:outline-none">
                  Sign Transaction
                </button>
              </Dialog.Close>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex  appearance-none items-center justify-center rounded-full focus:border-none focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => setIsDeclineDialogOpen(false)}
            >
              <Icon name="cross" height={18} width={18} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeclineProjectModal;
