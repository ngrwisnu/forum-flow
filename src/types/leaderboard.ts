import { UserType } from "./user";

export type LeaderboardType = {
  user: UserType;
  score: number;
};

export type LeaderboardResponse = LeaderboardType[];
