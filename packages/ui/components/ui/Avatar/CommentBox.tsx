import React from 'react';

import { AvatarLabelGroup } from './AvatarLabelGroup';
import { CommentReplies } from './CommentReplies';

interface CommentBoxProps {
  size: 'sm' | 'md' | 'lg';
  sticker: boolean;
  replies: boolean;
}

const CommentBox: React.FC<CommentBoxProps> = ({ size, sticker, replies }) => {
  return (
    <div>
      <div className="comment-header">
        {sticker && <div className="sticker">Sticker Icon Here</div>}
        <AvatarLabelGroup size={size} avatarSrc={''} title={''} />
      </div>

      <div className="comment-content">Comment content here...</div>

      {replies && <CommentReplies size={size} show={true} repliesCount={0} />}
    </div>
  );
};

export { CommentBox };
