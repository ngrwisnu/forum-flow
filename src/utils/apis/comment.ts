import { CreateCommentRequest } from "../../types/comment";
import { getAccessToken } from "./auths";
import callAPI, { BASE_URL } from "./callAPI";

export async function createComment(
  threadId: string,
  data: CreateCommentRequest,
) {
  const url = `${BASE_URL}/threads/${threadId}/comments`;

  return callAPI({
    url,
    method: "POST",
    token: getAccessToken(),
    body: data,
  });
}

export async function upVoteComment(threadId: string, commentId: string) {
  const url = `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`;

  return callAPI({
    url,
    method: "POST",
    token: getAccessToken(),
  });
}

export async function downVoteComment(threadId: string, commentId: string) {
  const url = `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`;

  return callAPI({
    url,
    method: "POST",
    token: getAccessToken(),
  });
}
