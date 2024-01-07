import { Post } from './post';

export interface Comment extends Post {
  parentPostUuid: string;
}
