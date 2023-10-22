import React from 'react';
import { AvatarProps, Avatar } from './Avatar';

interface AvatarGroupProps {
    avatars: AvatarProps[];
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
    shape?: 'circle' | 'square';
    maxCount?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
    avatars,
    size = 'md',
    shape = 'circle',
    maxCount = 3
}) => {
    const overflowCount = avatars.length - maxCount;

    return (
        <div className="flex -space-x-2">
            {avatars.slice(0, maxCount).map((avatar, index) => (
                <Avatar
                    key={index}
                    src={avatar.src}
                    alt={avatar.alt}
                    size={size}
                    shape={shape}
                    withIcon={avatar.withIcon}
                />
            ))}
            {overflowCount > 0 && (
                <span className="inline-flex items-center justify-center bg-gray-500 text-white text-xs font-medium rounded-full">
                    +{overflowCount}
                </span>
            )}
        </div>
    );
};
