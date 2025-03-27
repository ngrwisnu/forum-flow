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
