import { getAccessToken } from "./auth";
import callAPI, { BASE_URL } from "./callAPI";

export async function getUserProfile() {
  const url = `${BASE_URL}/users/me`;

  return callAPI({
    url,
    token: getAccessToken(),
  });
}
