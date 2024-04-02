import { Comment } from './comment';
import { Group } from './groups';
import { UserPost } from './user';

export interface Post {
  id: number;
  user: UserPost;
  group?: Pick<Group, 'id' | 'title'>;
  title: string;
  content: string;
  createdAt: string;
  interactCount: number;
  commentCount: number;
  userInteract: string;
  fileContent: string[];
}

export type TypePost = 'newsfeed' | 'group' | 'profile' | 'detail';

export interface PostDetail extends Post {
  comment: Comment[];
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
