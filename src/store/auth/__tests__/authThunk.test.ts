import { describe, test, expect, vi, afterEach, Mock } from 'vitest';
import {
  login,
  register,
  updateTokenInStorage,
  updateUserDetailsInStorage,
} from '../../../utils/apis/auths';
import { asyncUserLogin, asyncUserLogout, asyncUserSignup } from '../action';
import { getUserProfile } from '../../../utils/apis/users';
import { userLogin, userLogout } from '../slice';

vi.mock('../../../utils/apis/auths');
vi.mock('../../../utils/apis/users');

const mockData = {
  id: 'user-1',
  name: 'User1',
  email: 'user1@example.com',
};

describe('authThunk', () => {
  const mockDispatch = vi.fn();
  window.alert = vi.fn();

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  describe('asyncUserSignup', () => {
    test('should return the user data', async () => {
      (register as Mock).mockReturnValue({
        isError: false,
        data: mockData,
      });

      const result = await asyncUserSignup({
        name: 'User1',
        email: 'user1@example.com',
        password: 'secret123',
      })(mockDispatch, () => ({}), undefined);

      expect(result.payload).toEqual(mockData);
      expect(register).toHaveBeenCalledWith({
        name: 'User1',
        email: 'user1@example.com',
        password: 'secret123',
      });
    });

    test('should trigger the window alert', async () => {
      const errorResponse = {
        isError: true,
        message: 'Signup failed',
      };

      (register as Mock).mockReturnValue(errorResponse);

      const result = await asyncUserSignup({
        name: 'User1',
        email: 'user1@example.com',
        password: 'wrong123',
      })(mockDispatch, () => ({}), undefined);

      expect(window.alert).toHaveBeenCalledWith(errorResponse.message);
      expect(result.payload).toBeUndefined();
    });
  });

  describe('asyncUserLogin', () => {
    test('should be able to perform login and fetch profile successfully', async () => {
      (login as Mock).mockReturnValue({
        isError: false,
        data: { token: 'access-token' },
      });

      (getUserProfile as Mock).mockReturnValue({
        isError: false,
        data: {
          user: mockData,
        },
      });

      await asyncUserLogin({
        email: 'user1@example.com',
        password: 'secret123',
      })(mockDispatch, () => ({}), undefined);

      expect(updateTokenInStorage).toHaveBeenCalledWith('access-token');
      expect(updateUserDetailsInStorage).toHaveBeenCalledWith(mockData);
      expect(mockDispatch).toHaveBeenCalledWith(userLogin(mockData));
    });

    test('should trigger window alert if login fails', async () => {
      const errorResponse = {
        isError: true,
        message: 'Login failed',
      };

      (login as Mock).mockReturnValue(errorResponse);

      await asyncUserLogin({
        email: 'fail@example.com',
        password: 'wrong',
      })(mockDispatch, () => ({}), undefined);

      expect(window.alert).toHaveBeenCalledWith(errorResponse.message);
    });

    test('should trigger window alert if user profile fetch fails', async () => {
      const errorResponse = {
        isError: true,
        message: 'Profile fetch failed',
      };

      (login as Mock).mockReturnValue({
        isError: false,
        data: { token: 'token123' },
      });

      (getUserProfile as Mock).mockReturnValue(errorResponse);

      await asyncUserLogin({
        email: 'test@example.com',
        password: 'pass123',
      })(mockDispatch, () => ({}), undefined);

      expect(window.alert).toHaveBeenCalledWith(errorResponse.message);
    });
  });

  describe('asyncUserLogout', () => {
    test('should be able to clear storage and dispatch logout', async () => {
      await asyncUserLogout()(mockDispatch, () => ({}), undefined);

      expect(updateTokenInStorage).toHaveBeenCalledWith('');
      expect(updateUserDetailsInStorage).toHaveBeenCalledWith({});
      expect(mockDispatch).toHaveBeenCalledWith(userLogout());
    });
  });
});
