import { Post } from './post';
import { User, UserPost } from './user';

export interface Group {
  id: number;
  title: string;
  meta_title: string;
  memberCount: number;
  avatar: string | null;
  members: User[];
  background: string | null;
}

export type MemberRole = 'admin' | 'user';
export type MemberStatus = 'block' | 'active' | 'pending';

export interface Member {
  memberId: number;
  groupId: number;
  role: MemberRole;
  status: MemberStatus;
}

export interface GroupDetail extends Group {
  posts: Post[];
}

export const ViMemberStatus = {
  active: 'Đã tham gia',
  pending: 'Đang chờ phê duyệt'
};

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

export type TypeItemGroup = 'hot' | 'join' | 'host';

export interface UserApplyingGroup {
  role: MemberRole;
  status: MemberStatus;
  create_at: string;
  user: UserPost;
}
