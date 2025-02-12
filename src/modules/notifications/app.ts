import "./styles/notifications.css";

import { NotificationService } from "./application/NotificationsService";
import { NotificationsRepository } from "./infrastructure/NotificationsRepository";
import { NotificationsUI } from "./ui/NotificationsUI";

export function initNotificationsModule() {
  const notificationRepository = new NotificationsRepository();
  const notificationService = new NotificationService(notificationRepository);
  new NotificationsUI(notificationService);
}
