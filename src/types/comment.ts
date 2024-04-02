import { PostDetail } from './post';

export interface Comment extends PostDetail {
  parentPostId: number;
}
