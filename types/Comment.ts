import { UserType } from "./User";

export type CommentType = {
  id: string;
  createdAt: string;
  message: string;
  user: UserType;
};
