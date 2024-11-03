import { NotificationEvent } from '../enums/NotificationsEvent';

export interface Notification {
  id: number;
  title: string;
  content: string;
  recipientId: number;
  notificationEvent: NotificationEvent;
  isRead: boolean;
}
