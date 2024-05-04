import { Film } from '@/components/dashboards/search-bar';
import { PostExplore } from '@/types/post';
import { apiGet } from 'src/utils/api-request';

export class ExploreApi {
  static async getExplorePost(
    request: FormData
  ): Promise<{ data: PostExplore[] }> {
    const response = await apiGet('/explore', request);
    return response;
  }
  static async getPublicExplorePost(
    request: FormData
  ): Promise<{ data: PostExplore[] }> {
    const response = await apiGet('/public/explore', request);
    return response;
  }

  static async getUserMostFollower(): Promise<{
    data: { followerCount: number; id: number; name: string; avatar: string }[];
  }> {
    const response = await apiGet('/public/most-follower', new FormData());
    return response;
  }

  static async getSearchResult() {
    const data: { data: Film[] } = await apiGet('/explore/search', {});
    return data.data;
  }
}
