import { getAccessToken } from './auths';
import callAPI, { BASE_URL } from './callAPI';

export async function getUserProfile() {
  const url = `${BASE_URL}/users/me`;

  return callAPI({
    url,
    token: getAccessToken(),
  });
}

export async function getAllUsers() {
  const url = `${BASE_URL}/users`;

  return callAPI({
    url,
  });
}
