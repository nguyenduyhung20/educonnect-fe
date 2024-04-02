import { EventObject } from '@toast-ui/calendar/*';
import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

export class CalendarApi {
  static async postCalendar(request: Partial<EventObject>): Promise<Partial<EventObject>> {
    return await apiPost('/elearning/calendar', request);
  }

  static async getCalendars(): Promise<Partial<EventObject>> {
    return await apiGet(`/elearning/calendar`);
  }

  static async updateCalendar(request) {
    return await apiPatch(`/elearning/calendar/${request.id}`, request);
  }

  static async deleteCalendar(id: number) {
    return await apiDelete(`/elearning/calendar/${id}`, {});
  }
}
