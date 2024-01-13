import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

import { Post, PostDetail } from '@/types/post';

export class PostsApi {
  static async postPost(request: FormData): Promise<string> {
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

  static async getHotPostsByUserID(
    request: FormData
  ): Promise<{ data: Post[] }> {
    const response = await apiGet(`/user/hot-post`);
    return response;
  }

  static async getPostsByID(request: {
    id: number;
  }): Promise<{ data: PostDetail }> {
    const response = await apiGet(`/post/${request.id}`);
    return response;
  }

  static async updatePosts(request: { id: string }) {
    return await apiPatch(`/post/${request.id}`, request);
  }

  static async deletePost(request: { id: string }) {
    return await apiDelete(`/post/${request.id}`, request);
  }

  static async reactPost(
    request: {
      id: number;
      type: string;
    },
    action: string,
    info: {
      senderName: string;
      senderAvatar: string;
      receiverID: number;
      itemType: 'post' | 'comment';
      postID: number;
    }
  ) {
    return await apiPost(`/post/${request.id}/interact`, {
      type: request.type,
      action: action,
      info: info
    });
  }
}
