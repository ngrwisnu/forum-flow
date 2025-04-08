import type { Meta, StoryObj } from '@storybook/react';
import { FormItem } from '../components/ui/Form';
import Input from '../components/ui/Input';

const meta = {
  title: 'UI/Form/FormItem',
  component: FormItem,
  tags: ['autodocs'],
} satisfies Meta<typeof FormItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <FormItem>
      <label>Title</label>
      <Input placeholder="What is forum?" />
    </FormItem>
  ),
};
