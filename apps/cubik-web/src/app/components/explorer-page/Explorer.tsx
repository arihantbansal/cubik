'use client';

import { FC } from 'react';
import { Container } from '@chakra-ui/react';
import { GridOne } from '@ui/icons/svgs/grid-one';
import Search from '@ui/icons/svgs/search';

import { Project } from '@cubik/database';

import Projects from './Projects';

export const Explorer: FC<{ projects: Partial<Project>[] }> = ({
  projects,
}) => {
  return (
    <Container mt="4.5rem" background="black" maxW="full" px="0">
      <div className="grid grid-cols-3">
        <div className="col-span-2 p-4">
          <Projects projects={projects} />
        </div>
        <div className="col-span-1 p-4">
         
          <div className="mt-4">
            <div className="flex flex-col">
              <div className="flex max-w-sm flex-row justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <GridOne className="w-5" />
                  <h1 className="text-lg font-bold">Collections</h1>
                </div>
                <div className="flex flex-col items-start justify-start text-[#3776CC]">
                  <div className="relative mt-2 text-sm font-medium leading-[16px]">
                    View More
                  </div>
                </div>
              </div>
              <div className="w-sm text-colors-foreground-color-fg-primary font-text-xl-600 relative box-border flex flex-row items-center justify-start gap-[14px] px-4 py-1 text-left text-xl">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden">
                  <img
                    className="absolute left-[4px] top-[4px] h-[42px] w-[42px] rounded object-cover"
                    alt=""
                    src="https://pbs.twimg.com/profile_images/1621492955868545024/CpsOM4M3_400x400.jpg"
                  />
                  <img
                    className="absolute left-[50px] top-[4px] h-[42px] w-[42px] rounded object-cover"
                    alt=""
                    src="https://pbs.twimg.com/profile_images/1621492955868545024/CpsOM4M3_400x400.jpg"
                  />
                  <img
                    className="absolute left-[4px] top-[50px] h-[42px] w-[42px] rounded object-cover"
                    alt=""
                    src="https://pbs.twimg.com/profile_images/1621492955868545024/CpsOM4M3_400x400.jpg"
                  />
                  <div className="absolute left-[57px] top-[60px] font-medium leading-[16px]">
                    +9
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-start justify-start gap-[4px]">
                  <div className="flex w-[271px] flex-row items-end justify-start">
                    <div className="relative font-semibold leading-[28px]">
                      Solana Social
                    </div>
                  </div>
                  <div className="relative self-stretch overflow-hidden text-ellipsis text-[12px] leading-[18px] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-inline-box]">
                    Web3 Social apps that are built on Solana blockchain
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4"></div>
          <div className="mt-4"></div>
          <div className="mt-4"></div>
          <div className="mt-6"></div>
        </div>
      </div>
    </Container>
  );
};
