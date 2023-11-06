import React, { ReactNode } from 'react';

import { Icon } from '../../../icons/icon';
import { cn } from '../../../lib/utils';
import { AvatarLabelGroup } from '../Avatar/AvatarLabelGroup';
import { Button } from '../Button';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  logo: string;
  name: string;
  description: string;
  Button: ReactNode;
}
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}
export const SaveButton = (props: ButtonProps) => {
  return (
    <Button
      style={{
        border: '2px solid rgba(138, 138, 138, 0.25)',
      }}
      variant="tertiary"
      sizeVariant={'md'}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <Icon
          name="bookmark"
          width={18}
          height={18}
          className="fill-none stroke-white"
        />
        <span className={cn('text-base', 'lg:text-lg')}>Save</span>
      </div>
    </Button>
  );
};
export const ProjectCard = (props: Props) => {
  return (
    <>
      <div
        className={cn(
          props.className,
          'flex justify-between items-center p-6',
          'hover:bg-white/10',
        )}
        {...props}
      >
        <AvatarLabelGroup
          avatarSrc={props.logo ?? '/logo.svg'} // updated backup image
          size={'lg'}
          title={props.name}
          avatarShape="square"
          description={props.description}
        />
        {props.Button}
      </div>
    </>
  );
};
