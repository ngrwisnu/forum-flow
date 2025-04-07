import { render, screen, fireEvent } from '@testing-library/react';
import CommentCard from '../CommentCard';

vi.mock('../../../utils/apis/auths', () => ({
  getUserFromStorage: () => ({
    id: 'user-1',
    name: 'User1',
    email: 'user1@example.com',
  }),
}));
vi.mock('../../../helpers/formatCreatedTime', () => ({
  formatCreatedTime: () => `a day ago`,
}));
vi.mock('html-react-parser', () => ({
  default: (html: string) => html,
}));

const baseProps = {
  threadId: 'thread-1',
  id: 'comment-1',
  content: 'This is a test comment',
  owner: {
    id: 'user-2',
    name: 'User2',
    email: 'user2@example.com',
  },
  createdAt: '2024-01-01',
  upVotesBy: [],
  downVotesBy: [],
  upVoteCommentHandler: vi.fn(),
  downVoteCommentHandler: vi.fn(),
};

describe('CommentCard', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render the comment content and user info', () => {
    render(<CommentCard {...baseProps} />);

    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
    expect(screen.getByText(baseProps.owner.name)).toBeInTheDocument();
    expect(screen.getByAltText('profile')).toHaveAttribute(
      'src',
      '/src/assets/default-image.webp',
    );
    expect(screen.getByText(/ago/i)).toBeInTheDocument();
  });

  test('should call upVoteCommentHandler when upvote button is clicked', () => {
    render(<CommentCard {...baseProps} />);

    const upvoteButton = screen.getAllByRole('button')[0];

    fireEvent.click(upvoteButton);

    expect(baseProps.upVoteCommentHandler).toHaveBeenCalledWith(
      'thread-1',
      'comment-1',
    );
  });

  test('should call downVoteCommentHandler when downvote button is clicked', () => {
    render(<CommentCard {...baseProps} />);

    const downvoteButton = screen.getAllByRole('button')[1];

    fireEvent.click(downvoteButton);

    expect(baseProps.downVoteCommentHandler).toHaveBeenCalledWith(
      'thread-1',
      'comment-1',
    );
  });

  test('should display vote highlight if user has voted', () => {
    const votedProps = {
      ...baseProps,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    render(<CommentCard {...votedProps} />);

    const upButton = screen.getAllByRole('button')[0];

    expect(upButton).toHaveClass('bg-primary/80');
    expect(upButton.querySelector('svg')?.getAttribute('fill')).toBe('#ffffff');
  });

  test('should display down vote highlight if user has voted', () => {
    const votedProps = {
      ...baseProps,
      upVotesBy: [],
      downVotesBy: ['user-1'],
    };

    render(<CommentCard {...votedProps} />);

    const downButton = screen.getAllByRole('button')[1];

    expect(downButton).toHaveClass('bg-primary/80');
    expect(downButton.querySelector('svg')?.getAttribute('fill')).toBe(
      '#ffffff',
    );
  });

  test('should render the correct vote count', () => {
    const votedProps = {
      ...baseProps,
      upVotesBy: ['user-1', 'user-2'],
      downVotesBy: ['user-3'],
    };

    render(<CommentCard {...votedProps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
