import { GroupSearch } from '@/types/groups';
import { UserSearch } from '@/types/user';
import { apiGet } from '@/utils/api-request';

type UserSearchResponse = UserSearch[];

type GroupSearchResponse = GroupSearch[];

export class SearchApi {
  static async searchUser({ userInput }: { userInput: string }) {
    const response = await apiGet(`/search/user?name='${userInput.trim()}'`);
    const data: UserSearchResponse = response.data;
    return data;
  }

  static async searchGroup({ userInput }: { userInput: string }) {
    const response = await apiGet(`/search/group?text='${userInput.trim()}'`);
    const data: GroupSearchResponse = response.data;
    return data;
  }
}
