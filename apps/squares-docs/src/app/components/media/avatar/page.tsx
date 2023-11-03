'use client';

import React from 'react';
import CodeComponent from '@/app/home-page-components/code-component';

import { Avatar, AvatarGroup, AvatarLabelGroup } from '@cubik/ui';
import TitleWithIcon from '@cubik/ui/components/ui/Avatar/TitleWithIcon';

const Page = () => {
  return (
    <>
      <div className="flex flex-col justify-start gap-5 px-10">
        <div className="flex flex-col gap-4">
          <CodeComponent codeString='import {Avatar} from "@cubik/ui"' />
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
              variant="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="xs"
              iconName="infoCircle"
            />
            <Avatar
              variant="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              iconName="infoCircle"
              size="sm"
            />
            <Avatar
              variant="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="md"
              iconName="infoCircle"
            />
            <Avatar
              variant="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="lg"
              iconName="infoCircle"
            />
            <Avatar
              variant="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="xl"
              iconName="infoCircle"
            />
            <Avatar
              variant="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="2xl"
              iconName="infoCircle"
            />
            <Avatar
              variant="circle"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="3xl"
              iconName="infoCircle"
            />
          </div>
          <div className="flex flex-wrap items-center justify-start gap-7">
            <Avatar
              variant="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="xs"
              iconName="infoCircle"
            />
            <Avatar
              variant="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="sm"
              iconName="infoCircle"
            />
            <Avatar
              variant="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="md"
              iconName="infoCircle"
            />
            <Avatar
              variant="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="lg"
              iconName="infoCircle"
            />
            <Avatar
              variant="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="xl"
              iconName="infoCircle"
            />
            <Avatar
              variant="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="2xl"
              iconName="infoCircle"
            />
            <Avatar
              variant="square"
              src="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              alt="Image"
              size="3xl"
              iconName="infoCircle"
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
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                size="sm"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                size="md"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                size="lg"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                size="xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                size="2xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                size="3xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
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
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                size="sm"
                shape="square"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="md"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="lg"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="2xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="3xl"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
            </div>

            <div className="flex flex-col gap-3">
              <AvatarGroup
                size="xs"
                shape="square"
                variant="squared-horizontal"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                size="sm"
                shape="square"
                variant="squared-horizontal"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                variant="squared-horizontal"
                size="md"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="lg"
                variant="squared-horizontal"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="xl"
                variant="squared-horizontal"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="2xl"
                variant="squared-horizontal"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
              <AvatarGroup
                shape="square"
                size="3xl"
                variant="squared-horizontal"
                avatars={[
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                  {
                    src: 'https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg',
                    alt: 'sample image',
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="gap-8">
          <h3 className="text-xl font-bold">Avatar Label Groups</h3>
          <div className="flex flex-col gap-8">
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              description="description"
              subtitle="subtitle"
              size="xs"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              description="description"
              subtitle="subtitle"
              size="sm"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              description="description"
              subtitle="subtitle"
              size="md"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              description="description"
              subtitle="subtitle"
              size="lg"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              description="description"
              subtitle="subtitle"
              size="xl"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              description="description"
              subtitle="subtitle"
              size="2xl"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              description="description"
              subtitle="subtitle"
              size="3xl"
            />
          </div>

          <div className="flex flex-col gap-8">
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              longDescription="Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."
              subtitle="subtitle"
              size="xs"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              longDescription="Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              subtitle="subtitle"
              size="sm"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              longDescription="Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              subtitle="subtitle"
              size="md"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              longDescription="Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              subtitle="subtitle"
              size="lg"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              longDescription="Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              subtitle="subtitle"
              size="xl"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              longDescription="Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              subtitle="subtitle"
              size="2xl"
            />
            <AvatarLabelGroup
              avatarSrc="https://pbs.twimg.com/profile_images/1694008102709055488/ESkPDhR-_400x400.jpg"
              shape="circle"
              title="Title"
              longDescription="Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
              subtitle="subtitle"
              size="3xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
