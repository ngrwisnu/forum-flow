import { CommentType } from "./comment";
import { UserType } from "./user";

export interface ThreadType {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  ownerId: string;
  upVotesBy: string[];
  downVotesBy: string[];
  totalComments: number;
}

export type ThreadsResponse = ThreadType[];

export interface DetailThreadType extends Partial<ThreadType> {
  owner: Partial<UserType>;
  comments: CommentType[];
}
