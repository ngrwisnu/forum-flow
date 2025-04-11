import type { Meta, StoryObj } from '@storybook/react';
import Editor from '../components/ui/Editor';

const meta = {
  title: 'UI/Editor',
  component: Editor,
  tags: ['autodocs'],
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Write the text here...',
    editorHandler: () => {},
  },
};
