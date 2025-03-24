import { ThreadsResponse } from "../types/thread";

export const threadsSorter = (threads: ThreadsResponse): ThreadsResponse => {
  return [...threads].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};
