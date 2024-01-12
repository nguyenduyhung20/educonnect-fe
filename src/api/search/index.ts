import { apiGet } from '@/utils/api-request';

type UserDataInSearch = {
  id: number;
  name: string;
  avatar?: any;
  email: string;
  birthday: string;
  sex: string;
  createAt: string;
};

type UserSearchResponse = UserDataInSearch[];

export class SearchApi {
  static async searchUser({ userInput }: { userInput: string }) {
    const response = await apiGet(`/search/user?name='${userInput}'`);
    const data: UserSearchResponse = response.data;
    return data;
  }
}
