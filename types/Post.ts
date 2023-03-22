import { CommentType } from "./Comment";
import { UserType } from "./User";

export type PostType = {
  id: string;
  createdAt: string;
  title: string;
  userId: string;
  user: UserType;
  comments?: CommentType[];
};
