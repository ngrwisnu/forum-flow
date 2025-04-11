/*
- should handle updateLeaderboard action
- should return the initial state if the action type is not recognizable
*/

import { describe, test, expect, beforeAll } from 'vitest';
import leaderboardReducer, { updateLeaderboard } from '../slice';
import { LeaderboardResponse } from '../../../types/leaderboard';

describe('leaderboard-slice', () => {
  let initialState: {
    leaderboard: LeaderboardResponse;
  };

  beforeAll(() => {
    initialState = {
      leaderboard: [
        {
          user: {
            id: 'user-1',
            name: 'User1',
            email: 'user1@email.com',
          },
          score: 100,
        },
        {
          user: {
            id: 'user-2',
            name: 'User2',
            email: 'user2@email.com',
          },
          score: 90,
        },
      ],
    };
  });

  test('should handle updateLeaderboard action', () => {
    const fetchResult = [
      {
        user: {
          id: 'user-3',
          user: 'user3',
          name: 'User3',
          email: 'user3@email.com',
        },
        score: 110,
      },
    ];

    const action = updateLeaderboard(fetchResult);
    const result = leaderboardReducer(initialState, action);

    expect(result.leaderboard).toEqual(fetchResult);
  });

  test('should return the initial state if the action type is not recognizable', () => {
    const result = leaderboardReducer(initialState, {
      type: 'leaderboard/unknown',
    });

    expect(result.leaderboard).toEqual(initialState.leaderboard);
  });
});
