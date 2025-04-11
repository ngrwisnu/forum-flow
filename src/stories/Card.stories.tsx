import type { Meta, StoryObj } from '@storybook/react';
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
} from '../components/ui/Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => (
    <Card>
      <CardHeader>Card header</CardHeader>
      <CardContent>Card content</CardContent>
      <CardFooter>Card footer</CardFooter>
    </Card>
  ),
};
