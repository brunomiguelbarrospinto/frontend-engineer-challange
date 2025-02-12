import { NotificationService } from "../application/NotificationsService";
import { renderNotificationsBadge } from "./NotificationsBadge";

export class NotificationsUI {
  public notificationsBadgeContainer: HTMLElement | null;
  //public notificationList: HTMLElement | null;
  public audioNotification: HTMLAudioElement = new Audio("/notification.mp3");

  constructor(private notificationsService: NotificationService) {
    const websocket = this.notificationsService.openWebSocketNotifications();

    this.notificationsBadgeContainer = document.getElementById(
      "notifications-badge-notification"
    );

    if (this.notificationsBadgeContainer) {
      this.notificationsBadgeContainer.innerHTML = renderNotificationsBadge(0);
    }

    websocket.addEventListener("message", () => {
      this.notificationsBadgeContainer!.innerHTML = renderNotificationsBadge(
        this.notificationsService.totalNotifications()
      );
      this.audioNotification.play();
    });
  }
}
