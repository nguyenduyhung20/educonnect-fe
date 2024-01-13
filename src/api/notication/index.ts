import { apiGet } from 'src/utils/api-request';

export class NotificationsApi {
  static async getNotification(
    request: FormData
  ): Promise<{ data: { message: string; create_at: string }[] }> {
    return await apiGet('/user/notifications', request);
  }
}
