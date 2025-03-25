export const totalVotes = (upVote: number, downVote: number) => {
  return upVote + downVote;
};

export const totalUpVotes = (upVote: number, downVote: number) => {
  return upVote - downVote;
};
