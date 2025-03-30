import callAPI, { BASE_URL } from './callAPI';

export async function getLeaderboard() {
  const url = `${BASE_URL}/leaderboards`;

  return callAPI({
    url,
  });
}
