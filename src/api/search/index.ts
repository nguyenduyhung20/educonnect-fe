import { apiGet } from '@/utils/api-request';

type UserSearch = {
  id: number;
  name: string;
  avatar?: any;
  email: string;
  birthday: string;
  sex: string;
  createAt: string;
};

type UserSearchResponse = UserSearch[];

interface GroupSearch {
  id: number;
  title: string;
  metaTitle?: string | null;
  members: Members;
  createAt: string;
}

interface Members {
  users: User[];
  count: number;
}

interface User {
  id: number;
  name: string;
}

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
