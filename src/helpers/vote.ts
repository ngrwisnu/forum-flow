export const totalVotes = (upVote: number, downVote: number) => {
  if (upVote < 0 || downVote < 0) {
    throw Error('Negative value is not allowed.');
  }

  return upVote + downVote;
};

export const totalUpVotes = (upVote: number, downVote: number) => {
  if (upVote < 0 || downVote < 0) {
    throw Error('Negative value is not allowed.');
  }

  return upVote - downVote;
};
