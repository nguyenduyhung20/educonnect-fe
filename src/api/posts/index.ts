import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

import { Post } from '@/types/post';

export class PostsApi {
  static async postPost(request: Omit<Post, 'id'>): Promise<string> {
    return await apiPost('/posts', request);
  }

  static async getPosts(request: FormData): Promise<{ data: Post[] }> {
    const response = await apiGet('/posts', request);
    return response;
  }

  static async getPostsByID(id: string): Promise<{ data: Post }> {
    const response = await apiGet(`/posts/${id}`);
    return response;
  }

  static async updatePosts(request: { id: string }) {
    return await apiPatch(`/posts/${request.id}`, request);
  }

  static async deletePost(request: { id: string }) {
    return await apiDelete(`/posts/${request.id}`, request);
  }
}
