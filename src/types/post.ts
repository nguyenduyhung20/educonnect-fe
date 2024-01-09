import { UserPost } from './user';

export interface Post {
  id: number;
  user: UserPost;
  title: string;
  content: string;
  createdAt: string;
  postUuid: string;
  interactCount: number;
  commentCount: number;
}

export interface PostDetail extends Post {
  comment: Post[];
}
