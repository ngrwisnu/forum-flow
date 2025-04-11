import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/ui/Button';

const meta = {
  title: 'UI/Button/Secondary',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Base: Story = {
  args: {
    children: 'Button',
    className: 'btn-secondary',
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
