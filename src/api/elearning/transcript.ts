import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

export class TranscriptApi {
  static async postTranscript(request) {
    return await apiPost('/elearning/transcript', request);
  }

  static async getTranscriptsByRole(role) {
    if (role == 'parent') {
      return await apiGet(`/elearning/transcript/parent`);
    }
    return await apiGet(`/elearning/transcript`);
  }

  static async updateTranscript(request) {
    return await apiPatch(`/elearning/transcript/${request.id}`, request);
  }

  static async deleteTranscript(id: number) {
    return await apiDelete(`/elearning/transcript/${id}`, {});
  }
}
