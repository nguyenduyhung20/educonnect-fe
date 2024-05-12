import { UserPost } from './user';

export interface NotiData {
  senderInfo: { id: number; avatar: string; name: string };
  receiverID: number;
  content: string;
  itemId: number;
}

export interface Notification {
  message: string;
  createdAt: string;
  user: UserPost;
  itemId: number;
  id: number;
  isRead: boolean;
}
