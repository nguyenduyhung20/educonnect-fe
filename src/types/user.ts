import { Post } from './post';

export interface User {
  id: number;
  role: 'admin' | 'user' | 'student' | 'teacher' | 'parent';
  avatar: string;
  name: string;
  background: string;
  is_famous: boolean;
}

export interface UserDetail extends User {
  address: string;
  phone: string;
  birthday: string;
  email: string;
  ssn: string;
  sex: string;
  user_uuid: string;
  create_at: string;
  update_at: string;
  deleted: boolean;
}

export type UserPost = Pick<User, 'name' | 'avatar' | 'id' | 'is_famous'>;

export type UserProfile = {
  user: UserDetail;
  newsfeed: Post[];
};

export type UserSearch = {
  id: number;
  name: string;
  avatar?: any;
  email: string;
  birthday: string;
  sex: string;
  createAt: string;
};
