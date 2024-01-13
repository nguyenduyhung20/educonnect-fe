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

export interface GroupSearch {
  id: number;
  title: string;
  metaTitle?: string | null;
  members: GroupSearchMembers;
  createAt: string;
}

interface GroupSearchMembers {
  users: GroupSearchUser[];
  count: number;
}

interface GroupSearchUser {
  id: number;
  name: string;
}