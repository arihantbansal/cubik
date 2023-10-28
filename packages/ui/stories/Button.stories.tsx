import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Button } from '../components/ui/button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Button',
  // @ts-ignore
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
const Template: StoryFn<typeof Button> = (args: any) => <Button {...args} />;
export const Default: StoryFn<typeof Button> = Template.bind({});
Default.args = {};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Button',
    type: 'button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    size: 'lg',
    label: 'Button',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    size: 'sm',
    label: 'Button',
    variant: 'outline',
  },
};
