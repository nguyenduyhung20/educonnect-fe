import { Post } from './post';

export interface Comment extends Post {
  parentPostId: string;
}
