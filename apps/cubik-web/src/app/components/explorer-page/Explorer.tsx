'use client';

import { FC } from 'react';
import { Container } from '@chakra-ui/react';
import { Input } from '@ui/components/input';
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
          <Input
            placeholder="Search..."
            className="rounded-xl bg-[#333333] border-gray-600 max-w-sm"
            leftIcon={<Search />}
          />
          <div className="mt-4">
            <div className="flex flex-col">
              <div className="flex justify-between max-w-sm flex-row gap-2">
                <div className="flex flex-row gap-2">
                  <GridOne className="w-5" />
                  <h1 className="font-bold text-lg">Collections</h1>
                </div>
                <div className="flex flex-col items-start justify-start text-[#3776CC]">
                  <div className="relative leading-[16px] font-medium text-sm mt-2">
                    View More
                  </div>
                </div>
              </div>
              <div className="relative w-sm flex flex-row items-center justify-start py-1 px-4 box-border gap-[14px] text-left text-xl text-colors-foreground-color-fg-primary font-text-xl-600">
                <div className="relative w-24 h-24 overflow-hidden shrink-0">
                  <img
                    className="absolute top-[4px] left-[4px] rounded w-[42px] h-[42px] object-cover"
                    alt=""
                    src="https://pbs.twimg.com/profile_images/1621492955868545024/CpsOM4M3_400x400.jpg"
                  />
                  <img
                    className="absolute top-[4px] left-[50px] rounded w-[42px] h-[42px] object-cover"
                    alt=""
                    src="https://pbs.twimg.com/profile_images/1621492955868545024/CpsOM4M3_400x400.jpg"
                  />
                  <img
                    className="absolute top-[50px] left-[4px] rounded w-[42px] h-[42px] object-cover"
                    alt=""
                    src="https://pbs.twimg.com/profile_images/1621492955868545024/CpsOM4M3_400x400.jpg"
                  />
                  <div className="absolute top-[60px] left-[57px] leading-[16px] font-medium">
                    +9
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[4px]">
                  <div className="w-[271px] flex flex-row items-end justify-start">
                    <div className="relative leading-[28px] font-semibold">
                      Solana Social
                    </div>
                  </div>
                  <div className="self-stretch relative text-[12px] leading-[18px] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
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
