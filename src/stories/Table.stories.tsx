import { Meta, StoryObj } from '@storybook/react';
import Table, { TableRow } from '../components/ui/Table';

const meta = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <thead>
        <TableRow>
          <th>Name</th>
          <th>Age</th>
          <th>Role</th>
        </TableRow>
      </thead>
      <tbody>
        <TableRow>
          <td>Alice</td>
          <td>28</td>
          <td>Developer</td>
        </TableRow>
        <TableRow>
          <td>Bob</td>
          <td>34</td>
          <td>Designer</td>
        </TableRow>
      </tbody>
    </Table>
  ),
};
