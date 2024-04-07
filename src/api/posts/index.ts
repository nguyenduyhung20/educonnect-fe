import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';
import { Comment } from '@/types/comment';
import { Post, PostDetail } from '@/types/post';

export class PostsApi {
  static async postPost(request: FormData): Promise<string> {
    return await apiPost('/post', request);
  }

  static async getPosts(request: FormData): Promise<{ data: Post[] }> {
    const response = await apiGet('/posts', request);
    return response;
  }

  static async getNewsFeed(): Promise<{ data: Post[] }> {
    const response = await apiGet(`/user/newsfeed`);
    return response;
  }

  static async getPublicPosts(): Promise<{ data: Post[] }> {
    const response = await apiGet(`/public/hot-post`);
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
      senderAvatar: string;
      senderId: number;
      senderName: string;
      receiverID: number;
      itemType: 'post' | 'comment';
      itemId: number;
    }
  ) {
    return await apiPost(`/post/${request.id}/interact`, {
      type: request.type,
      action: action,
      info: info
    });
  }

  static async reactComment(
    request: {
      id: number;
      type: string;
    },
    action: string,
    info: {
      senderAvatar: string;
      senderId: number;
      senderName: string;
      receiverID: number;
      itemType: 'post' | 'comment';
      itemId: number;
    }
  ) {
    return await apiPost(`/post/${request.id}/interact-comment`, {
      type: request.type,
      action: action,
      info: info
    });
  }

  static async getComment(id: number): Promise<{ data: Comment }> {
    return await apiGet(`/post/comment/${id}`, {});
  }

  static async postComment(request: {
    id: number;
    content: string;
  }): Promise<Comment> {
    const response = await apiPost(`/post/${request.id}/comment`, {
      content: request.content
    });
    return response.data;
  }

  static async sendViewEvent({ postId }: { postId: number }) {
    const payload = {
      postId: postId.toString(),
      interactionType: 'view',
      timestamp: new Date().toISOString()
    };
    return await apiPost(`/event`, payload);
  }
}
