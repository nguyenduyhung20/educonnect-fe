import type { User } from 'src/types/user';
import { apiGet, apiPatch, apiPost } from 'src/utils/api-request';

type SignInRequest = {
  username: string;
  password: string;
};

type SignInResponse = Promise<{
  data: User;
  token: string;
}>;

type SignUpRequest = {
  email: string;
  name: string;
  password: string;
  phone: string;
};

type SignUpResponse = Promise<{
  accessToken: string;
}>;

interface FollowListResponse {
  data: {
    userFollowers: UserFollowers;
    userFolloweds: UserFollowers;
  };
}

interface UserFollowers {
  user: User[];
  count: number;
}

interface User {
  id: number;
  uuid: string;
  name: string;
  avatar?: string;
}

export class UsersApi {
  static async postUser(request: Omit<User, 'id'>): Promise<{ id: string }> {
    return await apiPost('/users', request);
  }

  static async putUser(request: Partial<User>) {
    const response = await apiPatch('/users/' + request.id, request);
    return response.data;
  }

  static async signIn(request: SignInRequest): SignInResponse {
    return await apiPost('/auth/login', request);
  }

  static async signUp(request: SignUpRequest): SignUpResponse {
    return await apiPost('/users', request);
  }

  static async me(): Promise<User> {
    const response = await apiGet('/user/info');
    return response.data;
  }

  static async updatePassword(payload: {
    old_password: string;
    new_password: string;
  }): Promise<User> {
    return await apiPost('/users/password', payload);
  }

  static async getUserProfile(id: number) {
    return await apiGet(`/user/${id}`);
  }

  static async followUser({ userId }: { userId: number }) {
    const response = await apiPost(`/user/follow/${userId}`, {});
    return response;
  }

  static async followList() {
    const response: FollowListResponse = await apiGet(`/user/follow`, {});
    return response.data;
  }
}
