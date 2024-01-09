import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

import { Post, PostDetail } from '@/types/post';

export class PostsApi {
  static async postPost(request: Partial<Post>): Promise<string> {
    return await apiPost('/post', request);
  }

  static async getPosts(request: FormData): Promise<{ data: Post[] }> {
    const response = await apiGet('/posts', request);
    return response;
  }

  static async getNewsFeed(request: { id: number }): Promise<{ data: Post[] }> {
    const response = await apiGet(`/user/newsfeed`);
    return response;
  }

  static async getHotPosts(request: FormData): Promise<{ data: Post[] }> {
    const response = await apiGet(`/public/hot-post`);
    return response;
  }

  static async getPostsByID(request: { id: number }): Promise<{ data: PostDetail }> {
    const response = await apiGet(`/post/${request.id}`);
    return response;
  }

  static async updatePosts(request: { id: string }) {
    return await apiPatch(`/posts/${request.id}`, request);
  }

  static async deletePost(request: { id: string }) {
    return await apiDelete(`/posts/${request.id}`, request);
  }
}
