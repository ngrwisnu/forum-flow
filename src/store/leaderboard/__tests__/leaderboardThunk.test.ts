/*
- should be able to dispatch loading, API call, updateLeaderboard, and hideLoading
- should dispatch openAlert if isError is true
*/

import { describe, test, expect, vi, afterEach, Mock } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { asyncGetLeaderboard } from '../action';
import { updateLeaderboard } from '../slice';
import { getLeaderboard } from '../../../utils/apis/leaderboard';
import { openAlert } from '../../alert/slice';
import { errorResponse } from '../../../../__tests__/helpers/errorResponse';

vi.mock('../../../utils/apis/leaderboard', () => ({
  getLeaderboard: vi.fn(),
}));

describe('asyncGetLeaderboard', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  test('should be able to dispatch loading, API call, updateLeaderboard, and hideLoading', async () => {
    const mockDispatch = vi.fn();

    const mockData = [
      {
        user: { id: 'user-1', name: 'User-1', email: 'user1@example.com' },
        score: 100,
      },
      {
        user: { id: 'user-2', name: 'User-2', email: 'user2@example.com' },
        score: 80,
      },
    ];

    (getLeaderboard as Mock).mockReturnValue({
      isError: false,
      data: { leaderboards: mockData },
    });

    await asyncGetLeaderboard()(mockDispatch, () => ({}), undefined);

    expect(mockDispatch).toHaveBeenCalledWith(showLoading());
    expect(mockDispatch).toHaveBeenCalledWith(updateLeaderboard(mockData));
    expect(mockDispatch).toHaveBeenCalledWith(hideLoading());
  });

  test('should dispatch openAlert if isError is true', async () => {
    const mockDispatch = vi.fn();

    const error = errorResponse('fetching failed');

    (getLeaderboard as Mock).mockReturnValue(error);

    await asyncGetLeaderboard()(mockDispatch, () => ({}), undefined);

    expect(mockDispatch).toHaveBeenCalledWith(showLoading());
    expect(mockDispatch).toHaveBeenCalledWith(hideLoading());
    expect(mockDispatch).toHaveBeenCalledWith(
      openAlert({ message: error.message }),
    );
  });
});
