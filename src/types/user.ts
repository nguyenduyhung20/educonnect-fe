export interface User {
  id: string;
  role: 'admin' | 'user' | 'student' | 'teacher' | 'parent';
  avatar: string;
  name: string;
}

export interface UserDetail extends User {
  address: string;
  phone: string;
  birthday: string;
  email: string;
  ssn: string;
  sex: string;
}

export type UserPost = Pick<User, 'name' | 'avatar' | 'id'>;
