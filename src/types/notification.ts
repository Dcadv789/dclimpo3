export type NotificationType = 'task' | 'note' | 'email';
export type NotificationAction = 'created' | 'completed' | 'saved' | 'sent';

export interface Notification {
  id: string;
  type: NotificationType;
  action: NotificationAction;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}