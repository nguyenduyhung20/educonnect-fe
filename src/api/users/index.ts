import type { User, UserProfile } from 'src/types/user';
import { apiGet, apiPatch, apiPost, getFormData } from 'src/utils/api-request';

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

  static async getUserProfile(id: number): Promise<{ data: UserProfile }> {
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

  static async changeAvatar(request: {
    userId: number;
    uploadedFiles: File[];
  }) {
    const response = await apiPost(
      `/user/avatar/${request.userId}`,
      getFormData(request)
    );
    return response;
  }

  static async changeBackGround(request: {
    userId: number;
    uploadedFiles: File[];
  }) {
    const response = await apiPost(
      `/user/background/${request.userId}`,
      getFormData(request)
    );
    return response;
  }
}
