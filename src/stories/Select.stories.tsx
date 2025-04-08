import type { Meta, StoryObj } from '@storybook/react';
import Select from '../components/ui/Select';

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </>
    ),
  },
};

export const WithFieldsetLabel: Story = {
  args: {
    children: (
      <>
        <option disabled selected>
          Pick category
        </option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </>
    ),
  },
};
