import { NewThreadRequest } from "../../types/thread";
import { getAccessToken } from "./auths";
import callAPI, { BASE_URL } from "./callAPI";

export async function createThread(data: NewThreadRequest) {
  const url = `${BASE_URL}/threads`;

  return callAPI({
    url,
    method: "POST",
    token: getAccessToken(),
    body: data,
  });
}

export async function getAllThreads() {
  const url = `${BASE_URL}/threads`;

  return callAPI({
    url,
  });
}

export async function getThread(threadId: string) {
  const url = `${BASE_URL}/threads/${threadId}`;

  return callAPI({
    url,
  });
}

export async function upVoteThread(threadId: string) {
  const url = `${BASE_URL}/threads/${threadId}/up-vote`;

  return callAPI({
    url,
    method: "POST",
    token: getAccessToken(),
  });
}

export async function downVoteThread(threadId: string) {
  const url = `${BASE_URL}/threads/${threadId}/down-vote`;

  return callAPI({
    url,
    method: "POST",
    token: getAccessToken(),
  });
}
