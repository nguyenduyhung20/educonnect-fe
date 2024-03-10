import { EventObject } from '@toast-ui/calendar/*';
import { apiGet, apiPost, apiDelete, apiPatch } from 'src/utils/api-request';

export class CalendarApi {
  static async postCalendar(request: Partial<EventObject>): Promise<Partial<EventObject>> {
    return await apiPost('/calendar', request);
  }

  static async getCalendars(): Promise<Partial<EventObject>> {
    return await apiGet(`/calendar`);
  }

  static async updateCalendar(request) {
    return await apiPatch(`/calendar/${request.id}`, request);
  }

  static async deleteCalendar(id: number) {
    return await apiDelete(`/calendar/${id}`, {});
  }
}
