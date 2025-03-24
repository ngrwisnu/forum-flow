import { UserResponse } from "./user";

export type LeaderboardType = {
  user: UserResponse;
  score: number;
};

export type LeaderboardResponse = LeaderboardType[];
