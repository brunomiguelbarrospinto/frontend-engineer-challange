import { type NotificationsRepository } from "../infrastructure/NotificationsRepository";

export class NotificationService {
  public notificationRepository: NotificationsRepository;

  constructor(notificationRepository: NotificationsRepository) {
    this.notificationRepository = notificationRepository;
  }

  notifications() {
    return this.notificationRepository.notifications;
  }
  totalNotifications() {
    return this.notifications()?.length;
  }
  openWebSocketNotifications() {
    return this.notificationRepository.openWebSocketNotifications();
  }
}
