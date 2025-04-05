import { describe, test, expect } from 'vitest';
import usersReducer, { updateUsers } from '../slice';

describe('users-slice', () => {
  test('should return the initial state when action type is not recognizable', () => {
    const initialState = usersReducer(undefined, { type: 'users/unknown' });

    expect(initialState).toEqual({ users: [] });
  });

  test('should replace the initial state of users with the new one', () => {
    const previousState = {
      users: [{ id: 'user-1', name: 'User1', email: 'user1@example.com' }],
    };

    const newUsers = [
      { id: 'user-2', name: 'User2', email: 'user2@example.com' },
      {
        id: 'user-3',
        name: 'User3',
        email: 'user3@example.com',
        avatar: 'avatar.png',
      },
    ];

    const action = updateUsers({ users: newUsers });
    const nextState = usersReducer(previousState, action);

    expect(nextState.users).toHaveLength(2);
    expect(nextState.users).toEqual(newUsers);
  });
});
