import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

import { Post } from '@/types/post';
import { Group } from '@/types/groups';

export class GroupsApi {
  static async postGroup(request: Omit<Post, 'id'>): Promise<string> {
    return await apiPost('/posts', request);
  }

  static async getGroups(request: FormData): Promise<{ data: Group[] }> {
    const response = await apiGet('/posts', request);
    return response;
  }

  static async getGroupsByID(id: string): Promise<{ data: Post }> {
    const response = await apiGet(`/posts/${id}`);
    return response;
  }

  static async updateGroups(request: { id: string }) {
    return await apiPatch(`/posts/${request.id}`, request);
  }

  static async deleteGroup(request: { id: string }) {
    return await apiDelete(`/posts/${request.id}`, request);
  }
}
