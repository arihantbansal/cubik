import * as React from 'react';

import { cn } from '../../lib/utils';
import { AvatarProps } from './Avatar/Avatar';
import { AvatarGroup } from './Avatar/AvatarGroup';

interface CardProps extends React.TextareaHTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  contributor_avatars?: AvatarProps[];
  grant_round: boolean;
  contributors?: number;
  matched?: string;
  short_description: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        {...ref}
        className={cn(
          'bg-black p-3 relative w-full flex flex-col items-start justify-center text-left text-5xl text-[#fff]',
        )}
      >
        <div className="self-stretch flex flex-row items-start justify-start gap-[18px]">
          <div className="w-[82px] overflow-hidden shrink-0 flex flex-row items-center justify-between">
            <img
              className="relative rounded-lg w-20 h-20 object-cover"
              alt=""
              src={props.image}
            />
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">
            <div className="self-stretch flex flex-row items-end justify-start">
              <div className="relative leading-[32px] font-semibold overflow-hidden text-xl text-ellipsis whitespace-nowrap">
                {props.title}
              </div>
            </div>
            <div className="self-stretch relative text-base leading-[24px] [display:-webkit-inline-box] overflow-hidden text-ellipsis [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
              {props.short_description}
            </div>
            <div className="w-[673px] flex flex-row flex-wrap items-center justify-start py-2 px-0 box-border gap-[12px] text-[14px]">
              <div className="flex flex-row items-center justify-start gap-[4px]">
                <div className="h-[22px] overflow-hidden flex flex-col items-center justify-between py-px px-0 box-border">
                  {/* {props.contributor_avatars && <div className="flex flex-row items-start justify-start">
                                        <img className="relative rounded-[100px] w-5 h-5 object-cover" alt="" src={props.contributor_imgs[0]} />
                                        <img className="relative rounded-[100px] w-5 h-5 object-cover ml-[-10px]" alt="" src={props.contributor_imgs[1]} />
                                        <img className="relative rounded-[100px] w-5 h-5 object-cover ml-[-10px]" alt="" src={props.contributor_imgs[2]} />
                                    </div>} */}
                  {props.contributor_avatars && (
                    <AvatarGroup avatars={props.contributor_avatars} />
                  )}
                </div>
                {props.contributors && (
                  <div className="flex flex-row items-center justify-start gap-[3px]">
                    <div className="relative leading-[20px] font-medium">
                      {props.contributors}
                    </div>
                    <div className="relative leading-[20px]">contributors</div>
                  </div>
                )}
              </div>
              <div className="relative rounded-[50%] bg-button-tertiary-text-button-tertiary-text-default w-0.5 h-0.5" />
              <div className="flex flex-row items-center justify-start">
                {props.matched && (
                  <div className="flex flex-row items-center justify-start gap-[3px]">
                    <div className="relative leading-[20px] font-medium">
                      {props.matched}
                    </div>
                    <div className="relative leading-[20px]">match</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start py-3 px-0 text-[14px]">
            <div className="rounded-md bg-[#00000000] box-border w-[114px] h-11 overflow-hidden shrink-0 flex flex-row items-center justify-center py-0 px-4 gap-[4px] border-[2px] border-solid border-[rgba(138, 138, 138, 0.25)]">
              <svg
                className="relative w-[18px] h-[18px] overflow-hidden shrink-0"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 9c0-1.861 0-2.792.245-3.545a5 5 0 0 1 3.21-3.21C9.208 2 10.139 2 12 2s2.792 0 3.545.245a5 5 0 0 1 3.21 3.21C19 6.208 19 7.139 19 9v13l-1.794-1.537c-1.848-1.584-2.771-2.376-3.808-2.678a5 5 0 0 0-2.796 0c-1.037.302-1.96 1.094-3.808 2.678L5 22V9Z"
                />
              </svg>

              <div className="flex flex-row items-center justify-center p-1">
                <div className="relative leading-[20px] font-semibold">
                  Save
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ProjectCard.displayName = 'Project Card';

export { ProjectCard };
export type { CardProps };
