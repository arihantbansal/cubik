import React from 'react';
import {Avatar} from './Avatar';
import TitleWithIcon from './TitleWithIcon';
import { cn } from "../../../lib/utils";

interface AvatarLabelProps {
  avatarSrc: string;
  title: string;
  subtitle?: string;
  description?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  variant: 1 | 2 | 3 | 4;
  avatarShape?: 'circle' | 'square';
}

const AvatarLabelGroup: React.FC<AvatarLabelProps> = ({ avatarShape, avatarSrc, title, subtitle, description, size, variant }) => {
  const showSubtitle = (variant === 1 || variant === 3);
  const showDescription = (variant === 1 || variant === 4);

  return (
    <div className={cn("flex items-center gap-4")}>
      <Avatar shape={avatarShape} src={avatarSrc} size={size} />
      <div className={cn("flex flex-col")}>
        <TitleWithIcon text={title} 
        // @ts-ignore
        size={size} />
        {showSubtitle && <span className={cn("text-gray-600")}>{subtitle}</span>}
        {showDescription && <p className={cn("text-gray-500")}>{description}</p>}
      </div>
    </div>
  );
};

export {AvatarLabelGroup};
