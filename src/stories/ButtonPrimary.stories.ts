import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/ui/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Button/Primary',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const Base: Story = {
  args: {
    children: 'Button',
    className: 'btn-primary',
  },
};

export const Medium: Story = {
  args: {
    ...Base.args,
    className: `${Base.args?.className} btn-md`,
  },
};

export const Small: Story = {
  args: {
    ...Base.args,
    className: `${Base.args?.className} btn-sm`,
  },
};
