export interface UserType {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type LeaderboardType = {
  user: UserType;
  score: number;
};
