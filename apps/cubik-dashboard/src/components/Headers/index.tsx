'use client';

import React, { useState } from 'react';

import { VerifyModal } from '../modals/verifyModal';
import { HandleConnect } from './handleConnect';

export const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <VerifyModal open={open} setOpen={setOpen} />
      <div className="w-full dark:bg-neutral-800">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <p className="text-2xl font-bold uppercase tracking-[0.4rem] text-black dark:text-white  ">
            CUBIK
          </p>
          <HandleConnect />
        </div>
      </div>
    </>
  );
};
