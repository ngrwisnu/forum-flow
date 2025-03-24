import { ThreadsResponse } from "../types/thread";

export const threadsSorter = (
  threads: ThreadsResponse,
  sortedBy: string,
): ThreadsResponse => {
  if (sortedBy === "newest") {
    return [...threads].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  if (sortedBy === "highest_votes") {
    return [...threads].sort(
      (a, b) =>
        b.upVotesBy.length +
        b.downVotesBy.length -
        (a.upVotesBy.length + a.downVotesBy.length),
    );
  }

  return threads;
};
