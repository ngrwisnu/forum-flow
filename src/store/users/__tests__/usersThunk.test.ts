import { describe, test, expect, vi, afterEach, Mock } from 'vitest';
import { getAllUsers } from '../../../utils/apis/users';
import { asyncGetUsers } from '../action';
import { updateUsers } from '../slice';

vi.mock('../../../utils/apis/users', () => ({
  getAllUsers: vi.fn(),
}));

describe('asyncGetUsers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  test('should be able to dispatch updateUsers', async () => {
    const mockDispatch = vi.fn();

    const mockData = {
      users: [
        { id: 'user-1', name: 'User-1', email: 'user1@example.com' },
        { id: 'user-2', name: 'User-2', email: 'user2@example.com' },
        {
          id: 'user-3',
          name: 'User-3',
          email: 'user3@example.com',
          avatar: 'https://example.com/avatar.png',
        },
      ],
    };

    (getAllUsers as Mock).mockReturnValue({
      isError: false,
      data: mockData,
    });

    await asyncGetUsers()(mockDispatch, () => ({}), undefined);

    expect(mockDispatch).toHaveBeenCalledWith(updateUsers(mockData));
  });

  test('should trigger window alert if isError is true', async () => {
    const mockDispatch = vi.fn();
    window.alert = vi.fn();

    const failedFetch = {
      isError: true,
      message: 'fetching failed',
    };

    (getAllUsers as Mock).mockReturnValue(failedFetch);

    await asyncGetUsers()(mockDispatch, () => ({}), undefined);

    expect(window.alert).toHaveBeenCalledWith(failedFetch.message);
  });
});
