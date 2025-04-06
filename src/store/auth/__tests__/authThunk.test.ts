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
import { errorResponse } from '../../../../__tests__/helpers/errorResponse';

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
      const error = errorResponse('Signup failed');

      (register as Mock).mockReturnValue(error);

      const result = await asyncUserSignup({
        name: 'User1',
        email: 'user1@example.com',
        password: 'wrong123',
      })(mockDispatch, () => ({}), undefined);

      expect(window.alert).toHaveBeenCalledWith(error.message);
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
      const error = errorResponse('Login failed');

      (login as Mock).mockReturnValue(error);

      await asyncUserLogin({
        email: 'fail@example.com',
        password: 'wrong',
      })(mockDispatch, () => ({}), undefined);

      expect(window.alert).toHaveBeenCalledWith(error.message);
    });

    test('should trigger window alert if user profile fetch fails', async () => {
      const error = errorResponse('Profile fetch failed');

      (login as Mock).mockReturnValue({
        isError: false,
        data: { token: 'token123' },
      });

      (getUserProfile as Mock).mockReturnValue(error);

      await asyncUserLogin({
        email: 'test@example.com',
        password: 'pass123',
      })(mockDispatch, () => ({}), undefined);

      expect(window.alert).toHaveBeenCalledWith(error.message);
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
