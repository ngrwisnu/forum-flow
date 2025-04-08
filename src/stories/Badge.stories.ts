import type { Meta, StoryObj } from '@storybook/react';
import Badge from '../components/ui/Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Badge',
    className: 'badge-primary',
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    className: 'badge-secondary',
  },
};

export const Neutral: Story = {
  args: {
    ...Primary.args,
    className: 'badge-neutral',
  },
};

export const Outline: Story = {
  args: {
    ...Primary.args,
    className: 'badge-outline',
  },
};
