import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TopUsers from '../TopUsers';

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

describe('TopUsers', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <TopUsers data={mockData} />
      </BrowserRouter>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('should render user ranking with score and name', () => {
    expect(screen.getByText(/Top Users/i)).toBeInTheDocument();
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('should render default image if avatar is missing', () => {
    const images = screen.getAllByAltText('profile');

    expect(images[0]).toHaveAttribute('src', '/src/assets/default-image.webp');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/user-2.png');
  });

  test('has a link to see all leaderboards', () => {
    const link = screen.getByRole('button', { name: /see leaderboards/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/leaderboards');
  });
});
