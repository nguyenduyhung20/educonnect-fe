import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

import { Group, Member } from '@/types/groups';
import { Post } from '@/types/post';

export class GroupsApi {
  static async postGroup(request: Omit<Group, 'id'>): Promise<string> {
    return await apiPost('/group', request);
  }

  static async getGroups(request: FormData): Promise<{ data: Group[] }> {
    const response = await apiGet('/group', request);
    return response;
  }

  static async getHotGroups(request: FormData): Promise<{ data: Group[] }> {
    const response = await apiGet('/public/hot-group', request);
    return response;
  }

  static async getGroupsByID(request: { id: number }): Promise<{ data: Group }> {
    const response = await apiGet(`/group/${request.id}`);
    return response;
  }

  static async getPostByGroupId(request: { id: number }): Promise<{ data: Post[] }> {
    const response = await apiGet(`/group/${request.id}/posts`);
    return response;
  }

  static async updateGroups(request: { id: string }) {
    return await apiPatch(`/group/${request.id}`, request);
  }

  static async deleteGroup(request: { id: string }) {
    return await apiDelete(`/group/${request.id}`, request);
  }

  //member
  static async joinGroup(request: Member) {
    return await apiPost(`/group/${request.groupId}/members`, request);
  }
  static async leaveGroup(request: Member) {
    return await apiDelete(`/group/${request.groupId}/members`, request);
  }
  static async approveMember(request: Member) {
    return await apiPatch(`/group/${request.groupId}/members`, request);
  }

  static async checkJoinGroup(request: Member): Promise<{ data: Member}> {
    return await apiGet(`/group/${request.groupId}/members/${request.memberId}`)
  }
}
