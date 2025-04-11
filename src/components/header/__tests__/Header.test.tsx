/*
- should render logo and navigation links
- should show login button when not authenticated
- should show user name, avatar, and logout button when authenticated
- should show user with default image
- should dispatch logout action when logout button is clicked
*/

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Mock } from 'vitest';
import { useDispatch } from 'react-redux';
import Header from '../Header';
import { asyncUserLogout } from '../../../store/auth/action';

vi.mock('react-redux');
vi.mock('../../../store/auth/action');

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

const mockUser = {
  id: 'user-1',
  name: 'Test User',
  email: 'user1@example.com',
};

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should render logo and navigation links', () => {
    renderWithRouter(<Header user={null} isAuthenticated={false} />);

    expect(screen.getByAltText(/logo-brand/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /home/i })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /leaderboard/i })[0],
    ).toBeInTheDocument();
  });

  test('should show login button when not authenticated', () => {
    renderWithRouter(<Header user={null} isAuthenticated={false} />);

    const loginBtn = screen.getByRole('link', { name: /login/i });

    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveAttribute('href', '/login');
  });

  test('should show user name, avatar, and logout button when authenticated', () => {
    const userWithAvatar = {
      ...mockUser,
      avatar: '/mock-avatar.png',
    };

    renderWithRouter(<Header user={userWithAvatar} isAuthenticated={true} />);

    expect(screen.getByText(userWithAvatar.name)).toBeInTheDocument();
    expect(screen.getByAltText(/profile-pic/i)).toHaveAttribute(
      'src',
      userWithAvatar.avatar,
    );
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('should show user with default image', () => {
    const userWithNoAvatar = {
      ...mockUser,
    };

    renderWithRouter(<Header user={userWithNoAvatar} isAuthenticated={true} />);

    expect(screen.getByText(userWithNoAvatar.name)).toBeInTheDocument();
    expect(screen.getByAltText(/profile-pic/i)).toHaveAttribute(
      'src',
      '/src/assets/default-image.webp',
    );
  });

  test('should dispatch logout action when logout button is clicked', () => {
    const dispatchMock = vi.fn();

    (useDispatch as unknown as Mock).mockReturnValue(dispatchMock);

    const userWithAvatar = {
      ...mockUser,
      avatar: '/mock-avatar.png',
    };

    renderWithRouter(<Header user={userWithAvatar} isAuthenticated={true} />);

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    expect(dispatchMock).toHaveBeenCalledWith(asyncUserLogout());
  });
});
