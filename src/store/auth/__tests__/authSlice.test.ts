import { describe, test, expect, afterEach, vi, Mock } from 'vitest';
import authReducer, { userLogin, userLogout } from '../slice';
import { getAccessToken, getUserFromStorage } from '../../../utils/apis/auths';

vi.mock('../../../utils/apis/auths', () => ({
  getAccessToken: vi.fn(),
  getUserFromStorage: vi.fn(),
}));

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  const userData = {
    id: 'test-user',
    email: 'test@example.com',
    name: 'Test User',
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('should return the old state when action type is not recognizable', () => {
    (getAccessToken as Mock).mockReturnValue('access-token');
    (getUserFromStorage as Mock).mockReturnValue({
      ...userData,
    });

    const oldState = {
      isAuthenticated: !!getAccessToken(),
      user: getUserFromStorage(),
    };

    const newState = authReducer(oldState, {
      type: 'auth/unknown',
      payload: {
        id: 'unknown-user',
        email: 'unknown@example.com',
        name: 'Unknown User',
      },
    });

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user).toEqual(userData);
  });

  describe('userLogin', () => {
    test('should set isAuthenticated to true and update user data', () => {
      (getAccessToken as Mock).mockReturnValue('');
      (getUserFromStorage as Mock).mockReturnValue(null);

      const payloadData = {
        ...userData,
      };

      const action = userLogin(payloadData);

      const newState = authReducer(initialState, action);

      expect(newState.isAuthenticated).toBe(true);
      expect(newState.user).toEqual(payloadData);
    });
  });

  describe('userLogout', () => {
    test('should set isAuthenticated to false and clear user data', () => {
      (getAccessToken as Mock).mockReturnValue('access-token');
      (getUserFromStorage as Mock).mockReturnValue({
        ...userData,
      });

      const loggedInState = {
        isAuthenticated: !!getAccessToken(),
        user: getUserFromStorage(),
      };

      const action = userLogout();
      const newState = authReducer(loggedInState, action);

      expect(newState.isAuthenticated).toBe(false);
      expect(newState.user).toBeNull();
    });
  });
});
