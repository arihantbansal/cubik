'use client';

import React from 'react';

import { Avatar, AvatarGroup, Icon } from '@cubik/ui';
import TitleWithIcon from '@cubik/ui/components/ui/Avatar/TitleWithIcon';

const Page = () => {
  return (
    <>
      <div className="flex flex-col justify-start gap-5 px-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Avatar with Title and Icon</h3>
          <div className="flex gap-10">
            <div>
              <TitleWithIcon variant="xs" text="Title" icon="github" />
              <TitleWithIcon text="Title" variant="sm" icon="github" />
              <TitleWithIcon text="Title" variant="md" icon="github" />
              <TitleWithIcon text="Title" variant="lg" icon="github" />
              <TitleWithIcon text="Title" variant="xl" icon="github" />
              <TitleWithIcon text="Title" variant="2xl" icon="github" />
              <TitleWithIcon text="Title" variant="3xl" icon="github" />
            </div>
            <div>
              <TitleWithIcon variant="xs" text="Title" />
              <TitleWithIcon text="Title" variant="sm" />
              <TitleWithIcon text="Title" variant="md" />
              <TitleWithIcon text="Title" variant="lg" />
              <TitleWithIcon text="Title" variant="xl" />
              <TitleWithIcon text="Title" variant="2xl" />
              <TitleWithIcon text="Title" variant="3xl" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Avatar</h3>
          <div className="flex flex-wrap items-center justify-start gap-7">
            <Avatar
              shape="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="xs"
            />
            <Avatar
              shape="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="sm"
            />
            <Avatar
              shape="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="md"
            />
            <Avatar
              shape="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="lg"
            />
            <Avatar
              shape="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="xl"
            />
            <Avatar
              shape="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="2xl"
            />
            <Avatar
              shape="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="3xl"
            />
          </div>
          <div className="flex flex-wrap items-center justify-start gap-7">
            <Avatar
              shape="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="xs"
              Icon={<Icon className="h-2 w-2" name="github" />}
            />
            <Avatar
              shape="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="sm"
              Icon={<Icon className="h-2 w-2" name="github" />}
            />
            <Avatar
              shape="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="md"
              Icon={<Icon className="h-2 w-2" name="github" />}
            />
            <Avatar
              shape="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="lg"
              Icon={<Icon className="h-2 w-2" name="github" />}
            />
            <Avatar
              shape="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="xl"
              Icon={<Icon className="h-2 w-2" name="github" />}
            />
            <Avatar
              shape="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="2xl"
              Icon={<Icon className="h-2 w-2" name="github" />}
            />
            <Avatar
              shape="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="3xl"
              Icon={<Icon className="h-2 w-2" name="github" />}
            />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Avatar Groups</h3>
          <div className="flex justify-start gap-10">
            <div className="flex flex-col gap-3">
              <AvatarGroup
                size="xs"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                size="sm"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                size="md"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                size="lg"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                size="xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                size="2xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                size="3xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
            </div>
            <div className="flex flex-col gap-3">
              <AvatarGroup
                size="xs"
                shape="square"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                size="sm"
                shape="square"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="md"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="lg"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="2xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="3xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Avatar Label Groups</h3>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Page;
