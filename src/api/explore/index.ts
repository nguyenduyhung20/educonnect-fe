import { PostExplore } from '@/types/post';
import { apiGet } from 'src/utils/api-request';

export class ExploreApi {
  static async getExplorePost(request: FormData): Promise<{ data: PostExplore[] }> {
    const response = await apiGet('/explore', request);
    return response;
  }
}
