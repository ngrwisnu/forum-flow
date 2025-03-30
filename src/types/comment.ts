import { UserType } from './user';

export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  upVotesBy: string[];
  downVotesBy: string[];
  owner: Partial<UserType>;
}

export interface CreateCommentRequest {
  content: string;
}
