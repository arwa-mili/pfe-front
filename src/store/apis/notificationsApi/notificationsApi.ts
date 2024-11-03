import {
  mapNotificationResponse,
  NotificationsResponse,
  NotificationsResponseClient
} from '../../../interfaces/notifications/notificationResponse.interface';
import {
  getNotifsCount,
  showNotifications
} from '../../../utils/consts/apiConsts/apiConsts';
import { apiSlice } from '../apiSlice';
export const notificationsApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNotifsCount: builder.query<number, { id: number }>({
      query: ({ id }) => ({
        url: getNotifsCount.replace(':userid', id.toString()),
        method: 'GET'
      })
    }),
    showNotifications: builder.query<
      NotificationsResponseClient,
      { userid: number; page: number }
    >({
      query: ({ userid, page }) => ({
        url: showNotifications
          .replace(':userid', userid.toString())
          .replace(':page', page.toString()),
        method: 'GET'
      }),
      transformResponse: (response: NotificationsResponse) => {
        return mapNotificationResponse(response);
      }
    })
  })
});

export const { useLazyGetNotifsCountQuery, useLazyShowNotificationsQuery } =
  notificationsApiSlice;
