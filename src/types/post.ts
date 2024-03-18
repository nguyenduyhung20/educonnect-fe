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
  userInteract: string;
  fileContent: string[];
}

export type TypePost = 'newsfeed' | 'group' | 'profile' | 'detail';

export interface PostDetail extends Post {
  comment: Post[];
}

export interface PostExplore {
  id: number;
  title: string;
  user: UserPost;
  contentSummarization: string;
  createdAt: string;
  commentCount: number;
  interactCount: number;
  userInteract: string;
}
