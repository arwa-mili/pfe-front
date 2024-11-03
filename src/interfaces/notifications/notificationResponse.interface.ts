import { ImageSourcePropType } from 'react-native';
import { NotificationEvent } from '../../enums/NotificationsEvent';
import { Notification } from '../../models/Notification';
import { Images } from '../../utils/StylingConsts/images/Images';

export interface NotificationsResponse {
  notifications: Notification[];
  total_pages: number;
}
export interface NotificationsResponseClient {
  notifications: NotificationClient[];
  total_pages: number;
}

export interface NotificationClient {
  id: number;
  title: string;
  content: string;
  avatar: ImageSourcePropType | undefined;
  //isRead: boolean;
}

export function mapNotificationResponse(
  response: NotificationsResponse
): NotificationsResponseClient {
  const notifClient = response.notifications.map((notif) => {
    const avatar =
      notif.notificationEvent === NotificationEvent.VIEWED
        ? Images.requestConsulted
        : Images.dashboard;

    return {
      id: notif.id,
      avatar: avatar,
      title: notif.title,
      content: notif.content
    };
  });

  return {
    notifications: notifClient,
    total_pages: response.total_pages
  };
}
