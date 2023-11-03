'use client';

import React, { useState } from 'react';

import { Button, Icon, SidePannel, TableCell, TableRow } from '@cubik/ui';

import AcceptProjectModal from '../../modals/AcceptProjectModal';
import DeclineProjectModal from '../../modals/DeclineProjectModal';
import { ProjectInfo } from '../../ProjectInfo';

export const TableRows = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] =
    useState<boolean>(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState<boolean>(false);
  const [_modalContent, setModalContent] = useState<any>(null);

  const openModal = (content: any) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <>
      <TableRow
        className="hover:bg-surface-neutral-820"
        onClick={() => openModal('Superteam Earn')}
      >
        <TableCell className="pl-10 font-medium">
          <div className="flex items-center justify-start gap-3">
            <div className="h-10 w-10 rounded-md bg-red-500" />
            <div className="flex flex-col items-start justify-start">
              <p className="text-base text-white">Superteam Earn</p>
              <p className="text-surface-neutral-500 text-sm">
                earn@superteam.fun
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="text-surface-blue-500 text-sm font-medium underline underline-offset-4">
            earn.superteam.fun
          </p>
        </TableCell>
        <TableCell>
          <div className="flex items-center justify-start gap-2">
            <div className="h-5 w-5 rounded-full bg-red-600" />
            <p className="text-base font-semibold text-white">@dhruv</p>
          </div>
        </TableCell>
        <TableCell className="">
          <button className="rounded-full bg-violet-700 px-8 py-1 text-sm font-normal text-white">
            pending
          </button>
        </TableCell>
        <TableCell className="text-sm font-medium text-white">
          1 day ago
        </TableCell>
      </TableRow>

      {isModalOpen && (
        <SidePannel open={isModalOpen} setOpen={setIsModalOpen}>
          <div className="flex h-full flex-col divide-y divide-gray-200 bg-[#141414] shadow-xl ">
            <div onClick={() => setIsModalOpen(false)}>
              <Icon
                name="cross"
                className="absolute right-8 top-4 cursor-pointer"
                fill="none"
                height={16}
                width={16}
                stroke="#fff"
              />
            </div>

            <ProjectInfo />
            <div className="flex w-full justify-start border-none bg-neutral-600 p-4">
              <div className="flex w-full space-x-2 pb-4">
                <Button
                  variant="danger"
                  className="flex-1 space-x-2"
                  onClick={() => {
                    setIsDeclineDialogOpen(true);
                    setIsModalOpen(false);
                  }}
                >
                  <p>Decline</p>
                  <Icon name="cross" height={14} width={14} fill="none" />
                </Button>

                <Button
                  variant="success"
                  className="flex-1 space-x-2  text-black"
                  onClick={() => {
                    setIsAcceptDialogOpen(true);
                    setIsModalOpen(false);
                  }}
                >
                  <p>Accept</p>
                  <Icon
                    name="doubleTick"
                    height={14}
                    width={14}
                    fill="none"
                    stroke="#000"
                  />
                </Button>
              </div>
            </div>
          </div>
        </SidePannel>
      )}

      <DeclineProjectModal
        isDeclineDialogOpen={isDeclineDialogOpen}
        setIsDeclineDialogOpen={setIsDeclineDialogOpen}
      />

      <AcceptProjectModal
        isAcceptDialogOpen={isAcceptDialogOpen}
        setIsAcceptDialogOpen={setIsAcceptDialogOpen}
      />
    </>
  );
};
