import { SignupRequest } from "../../types/auth";
import { UserType } from "../../types/user";
import callAPI, { BASE_URL, CallAPIResponse } from "./callAPI";

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function updateTokenInStorage(accessToken: string) {
  return localStorage.setItem("accessToken", accessToken);
}

export function updateUserDetailsInStorage(data: UserType | object) {
  return localStorage.setItem("user", JSON.stringify(data));
}

export function getUserFromStorage(): UserType | null {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}

export async function register({
  name,
  email,
  password,
}: SignupRequest): CallAPIResponse {
  const url = `${BASE_URL}/register`;

  return callAPI({
    url,
    method: "POST",
    body: {
      name,
      email,
      password,
    },
  });
}

export async function login(email: string, password: string): CallAPIResponse {
  const url = `${BASE_URL}/login`;

  return callAPI({
    url,
    method: "POST",
    body: {
      email,
      password,
    },
  });
}
