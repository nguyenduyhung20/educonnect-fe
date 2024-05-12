import { ReportInfo } from '@/types/reportInfo';
import { apiGet, apiPatch, apiPost } from '@/utils/api-request';

export class ReportApi {
  static async ReportPost(
    postId: number,
    userId: number,
    reason: string,
    groupId?: number
  ) {
    return await apiPost('/report', {
      postId: postId,
      userId: userId,
      reason: reason,
      groupId: groupId ?? null
    });
  }

  static async getPostReportedGroup(
    groupId: number
  ): Promise<{ data: ReportInfo[] }> {
    return apiGet(`/report/group/${groupId}`);
  }

  static async skipReportPost(userId: number, postId: number) {
    return apiPatch(`/report/group`, {
      userId: userId,
      postId: postId
    });
  }

  static async deletePostReported(
    postId: number,
    groupId: number,
    userId: number
  ) {
    return apiPatch(`/report/group/delete`, {
      postId: postId,
      groupId: groupId,
      userId: userId
    });
  }
}
