import { Notification, NotificationModel } from "../domain/NotificationModel";

export class NotificationsRepository {
  public notifications: NotificationModel[] = [];
  public webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket(
      import.meta.env.VITE_WS_HOST + `/notifications`
    );
  }

  openWebSocketNotifications() {
    this.webSocket.onmessage = (event: MessageEvent) => {
      const notification: Notification = JSON.parse(event.data);
      this.notifications.push(new NotificationModel(notification));
    };

    return this.webSocket;
  }
}
