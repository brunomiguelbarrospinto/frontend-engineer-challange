import {
  NotificationModel,
  createNotificationMock,
} from "../domain/NotificationModel";
import { expect, test } from "vitest";

import { NotificationsRepository } from "./NotificationsRepository";
import { Server } from "mock-socket";

const notification = createNotificationMock();

const mockServer = new Server(import.meta.env.VITE_WS_HOST + "/notifications");

test("should create a NotificationRepository instance", async () => {
  const notificationRepository = new NotificationsRepository();

  notificationRepository.openWebSocketNotifications();

  mockServer.emit("message", JSON.stringify(notification));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(notificationRepository.notifications[0]).toEqual(
    new NotificationModel(notification)
  );
});
