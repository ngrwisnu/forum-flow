import type { Meta, StoryObj } from '@storybook/react';
import Input from '../components/ui/Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['text', 'password'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPlaceholder: Story = {
  args: {
    type: 'text',
    placeholder: 'Write here...',
  },
};

export const TypeText: Story = {
  args: {
    type: 'text',
    defaultValue: 'Input value',
  },
};

export const TypePassword: Story = {
  args: {
    type: 'password',
    defaultValue: 'secret',
  },
};
