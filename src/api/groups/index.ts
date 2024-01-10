import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

import { Group } from '@/types/groups';

export class GroupsApi {
  static async postGroup(request: Omit<Group, 'id'>): Promise<string> {
    return await apiPost('/group', request);
  }

  static async getGroups(request: FormData): Promise<{ data: Group[] }> {
    const response = await apiGet('/group', request);
    return response;
  }

  static async getGroupsByID(request: { id: number }): Promise<{ data: Group }> {
    const response = await apiGet(`/group/${request.id}`);
    return response;
  }

  static async updateGroups(request: { id: string }) {
    return await apiPatch(`/group/${request.id}`, request);
  }

  static async deleteGroup(request: { id: string }) {
    return await apiDelete(`/group/${request.id}`, request);
  }
}
