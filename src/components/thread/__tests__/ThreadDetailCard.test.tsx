/*
- should render title, body, author, and posted time
- should render default avatar if none is provided
- should display the vote count
- should call upVoteThreadHandler when upvote button is clicked
- should call downVoteThreadHandler when downvote button is clicked
- should show active vote button styles if user has upvoted
- should show active vote button styles if user has downvoted
*/

import { render, screen, fireEvent } from '@testing-library/react';
import ThreadDetailCard from '../ThreadDetailCard';

vi.mock('../../../utils/apis/auths', () => ({
  getUserFromStorage: () => ({
    id: 'auth-user',
    name: 'Auth User',
    email: 'auth@example.com',
    avatar: 'auth-avatar.png',
  }),
}));

vi.mock('../../../helpers/formatCreatedTime', () => ({
  formatCreatedTime: () => '3 hours ago',
}));

vi.mock('../../../helpers/vote', () => ({
  totalUpVotes: () => 0,
}));

vi.mock('html-react-parser', () => ({
  default: () => 'parsed text',
}));

const baseThreadDetails = {
  id: 'thread-1',
  title: 'Sample Thread',
  body: '<p>This is the thread body</p>',
  createdAt: new Date().toISOString(),
  category: 'react',
  owner: {
    id: 'user-1',
    name: 'User1',
    email: 'user1@example.com',
  },
  comments: [],
  upVotesBy: [],
  downVotesBy: [],
  upVoteThreadHandler: vi.fn(),
  downVoteThreadHandler: vi.fn(),
};

describe('ThreadDetailCard', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render title, body, author, and posted time', () => {
    render(<ThreadDetailCard {...baseThreadDetails} />);

    expect(screen.getByText(baseThreadDetails.title)).toBeInTheDocument();
    expect(screen.getByText('parsed text')).toBeInTheDocument();
    expect(screen.getByText(baseThreadDetails.owner.name)).toBeInTheDocument();
    expect(screen.getByText(/3 hours ago/)).toBeInTheDocument();
  });

  test('should render default avatar if none is provided', () => {
    render(<ThreadDetailCard {...baseThreadDetails} />);

    expect(screen.getByAltText('profile')).toHaveAttribute(
      'src',
      '/src/assets/default-image.webp',
    );
  });

  test('should display the vote count', () => {
    render(<ThreadDetailCard {...baseThreadDetails} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('should call upVoteThreadHandler when upvote button is clicked', () => {
    render(<ThreadDetailCard {...baseThreadDetails} />);

    const upvoteButton = screen.getAllByRole('button')[0];

    fireEvent.click(upvoteButton);

    expect(baseThreadDetails.upVoteThreadHandler).toHaveBeenCalledWith(
      'thread-1',
    );
  });

  test('should call downVoteThreadHandler when downvote button is clicked', () => {
    render(<ThreadDetailCard {...baseThreadDetails} />);

    const downvoteButton = screen.getAllByRole('button')[1];

    fireEvent.click(downvoteButton);

    expect(baseThreadDetails.downVoteThreadHandler).toHaveBeenCalledWith(
      'thread-1',
    );
  });

  test('should show active vote button styles if user has upvoted', () => {
    const votedProps = {
      ...baseThreadDetails,
      upVotesBy: ['auth-user'],
      downVotesBy: [],
    };

    render(<ThreadDetailCard {...votedProps} />);

    const upvoteButton = screen.getAllByRole('button')[0];
    expect(upvoteButton).toHaveClass('bg-primary/80');

    const downvoteButton = screen.getAllByRole('button')[1];
    expect(downvoteButton).not.toHaveClass('bg-primary/80');
  });

  test('should show active vote button styles if user has downvoted', () => {
    const votedProps = {
      ...baseThreadDetails,
      upVotesBy: [],
      downVotesBy: ['auth-user'],
    };

    render(<ThreadDetailCard {...votedProps} />);

    const upvoteButton = screen.getAllByRole('button')[0];
    expect(upvoteButton).not.toHaveClass('bg-primary/80');

    const downvoteButton = screen.getAllByRole('button')[1];
    expect(downvoteButton).toHaveClass('bg-primary/80');
  });
});
