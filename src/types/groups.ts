import { Post } from './post';
import { User } from './user';

export interface Group {
  id: number,
  title: string;
  memberCount: number;
  avatar: string;
  members: User[]
}

export interface GroupDetail extends Group {
  posts: Post[];
}
