import { CommentType } from '../types/comment';
import { ThreadType } from '../types/thread';

export const itemsSorter = <T extends ThreadType | CommentType>(
  data: T[],
  sortedBy: 'newest' | 'highest_votes',
  votesCounter?: (totalUpVote: number, totalDownVote: number) => number,
): T[] => {
  if (sortedBy === 'newest') {
    return [...data].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  if (sortedBy === 'highest_votes' && votesCounter) {
    return [...data].sort((a, b) => {
      const votesA = votesCounter(a.upVotesBy.length, a.downVotesBy.length);
      const votesB = votesCounter(b.upVotesBy.length, b.downVotesBy.length);

      if (votesB > votesA) return 1;
      if (votesB < votesA) return -1;
      return 0;
    });
  }

  return [...data].reverse();
};
