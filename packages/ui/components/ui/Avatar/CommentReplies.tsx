import React from 'react';

import { AvatarLabelGroup } from './AvatarLabelGroup';

interface CommentRepliesProps {
  show: boolean;
  size: 'sm' | 'md' | 'lg';
  repliesCount: number;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

const CommentReplies: React.FC<CommentRepliesProps> = ({
  show,
  size,
  repliesCount,
}) => {
  const textSize = sizeClasses[size];

  if (!show) {
    return <span className={textSize}>{`${repliesCount} replies`}</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <AvatarLabelGroup avatarSrc={''} title={''} size={'sm'} />
      <span className={textSize}>{`${repliesCount} replies`}</span>
    </div>
  );
};

export { CommentReplies };
