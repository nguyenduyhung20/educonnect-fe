import { Post } from './post';

export interface Group {
  name: string;
  amountMember: number;
  avatars: string[];
}

export interface GroupDetail extends Group {
  posts: Post[];
}
