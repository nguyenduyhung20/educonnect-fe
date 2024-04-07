import { Notification } from '@/types/noti';
import { apiGet, apiPost } from 'src/utils/api-request';

export class NotificationsApi {
  static async getNotification(request: FormData): Promise<{
    data: Notification[];
  }> {
    return await apiGet('/user/notifications', request);
  }

  static async readNotification(notificationId: number): Promise<{
    data: Notification[];
  }> {
    return await apiPost(`/user/read-notification/${notificationId}`, {});
  }
}
