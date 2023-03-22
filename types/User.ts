import { PostType } from "./Post";

export type UserType = {
  name: string;
  image: string;
  posts: PostType[];
};
