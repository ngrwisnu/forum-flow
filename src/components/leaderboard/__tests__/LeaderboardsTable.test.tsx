/*
- should render all leaderboard rows correctly with names and scores
- should be start from index 4
- should show the default avatar if none is provided
*/

import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LeaderboardsTable from '../LeaderboardsTable';

const mockData = [
  {
    user: {
      id: 'user-1',
      name: 'User1',
      email: 'user1@example.com',
      avatar: '',
    },
    score: 150,
  },
  {
    user: {
      id: 'user-2',
      name: 'User2',
      email: 'user2@example.com',
      avatar: 'https://example.com/user-2.png',
    },
    score: 120,
  },
];

describe('LeaderboardsTable', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <LeaderboardsTable data={mockData} />
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('should render all leaderboard rows correctly with names and scores', () => {
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  test('should be start from index 4', () => {
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('should show the default avatar if none is provided', () => {
    const images = screen.getAllByAltText('Avatar');

    expect(images[0]).toHaveAttribute('src', '/src/assets/default-image.webp');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/user-2.png');
  });
});
