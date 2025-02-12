import { expect, test } from "vitest";

import { NotificationService } from "../application/NotificationsService";
import { NotificationsRepository } from "../infrastructure/NotificationsRepository";
import { NotificationsUI } from "./NotificationsUI";
import { Server } from "mock-socket";
import { createNotificationMock } from "../domain/NotificationModel";

const notification = createNotificationMock();

const mockServer = new Server(import.meta.env.VITE_WS_HOST + "/notifications");

//mock audio play
HTMLAudioElement.prototype.play = () => Promise.resolve();

test("Should render a notification badge", async () => {
  document.body.innerHTML = '<div id="notifications-badge-notification"></div>';

  const notificationRepository = new NotificationsRepository();
  const notificationService = new NotificationService(notificationRepository);
  const notificationsUI = new NotificationsUI(notificationService);

  expect(notificationsUI.notificationsBadgeContainer?.innerHTML).toContain(
    "Notifications"
  );

  mockServer.emit("message", JSON.stringify(notification));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(notificationsUI.notificationsBadgeContainer?.innerHTML).toContain(
    "New documents added"
  );
});
