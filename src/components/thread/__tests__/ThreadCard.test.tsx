import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Mock } from 'vitest';
import ThreadCard from '../ThreadCard';
import { totalVotes } from '../../../helpers/vote';

vi.mock('../../../helpers/formatCreatedTime', () => ({
  formatCreatedTime: () => '2 days ago',
}));

vi.mock('../../../helpers/vote');

vi.mock('../../../helpers/truncateText.ts', () => ({
  truncateText: () => 'text ...',
}));

vi.mock('html-react-parser');

const baseThread = {
  id: 'thread-1',
  title: 'Sample Thread Title',
  body: 'This is the content of the thread.',
  createdAt: new Date().toISOString(),
  category: 'react',
  ownerId: 'user-1',
  upVotesBy: ['user-1', 'user-2'],
  downVotesBy: ['user-3'],
  totalComments: 5,
};

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('ThreadCard', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render thread info with user avatar and name', () => {
    renderWithRouter(
      <ThreadCard {...baseThread} avatar="avatar.png" name="User1" />,
    );

    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByAltText('profile')).toHaveAttribute('src', 'avatar.png');
    expect(screen.getByText('Sample Thread Title')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('2 days ago')).toBeInTheDocument();
  });

  test('should render default image if avatar is not provided', () => {
    renderWithRouter(<ThreadCard {...baseThread} name="User1" />);

    expect(screen.getByAltText('profile')).toHaveAttribute(
      'src',
      '/src/assets/default-image.webp',
    );
  });

  test('should show correct vote and comment count text', () => {
    (totalVotes as Mock).mockReturnValueOnce(2);

    renderWithRouter(<ThreadCard {...baseThread} name="User1" />);

    expect(screen.getByText('votes')).toBeInTheDocument();
    expect(screen.getByText('comments')).toBeInTheDocument();
  });

  test('should render a link to the thread detail page', () => {
    renderWithRouter(<ThreadCard {...baseThread} name="User1" />);

    const threadLink = screen.getAllByRole('link', {
      name: baseThread.title,
    })[0];
    expect(threadLink).toHaveAttribute('href', '/threads/thread-1');
  });

  test('should render "Read more" link if body is long', () => {
    const longThread = {
      ...baseThread,
      body: 'This is the long content. '.repeat(20),
    };

    renderWithRouter(<ThreadCard {...longThread} name="User1" />);

    expect(screen.getByText('Read more')).toHaveAttribute(
      'href',
      '/threads/thread-1',
    );
  });

  test('should not render "Read more" if body is short', () => {
    renderWithRouter(<ThreadCard {...baseThread} name="User1" />);

    expect(screen.queryByText('Read more')).not.toBeInTheDocument();
  });

  test('should display singular "comment" and "vote"', () => {
    const singleVoteThread = {
      ...baseThread,
      totalComments: 1,
    };

    (totalVotes as Mock).mockReturnValueOnce(1);

    renderWithRouter(<ThreadCard {...singleVoteThread} name="User1" />);

    expect(screen.getByText('vote')).toBeInTheDocument();
    expect(screen.getByText('comment')).toBeInTheDocument();
  });
});
