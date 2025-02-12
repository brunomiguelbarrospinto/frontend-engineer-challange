import {
  NotificationModel,
  createNotificationMock,
} from "../domain/NotificationModel";
import { expect, test } from "vitest";

import { NotificationService } from "./NotificationsService";
import { NotificationsRepository } from "../infrastructure/NotificationsRepository";
import { Server } from "mock-socket";

const notification = createNotificationMock();

const mockServer = new Server(import.meta.env.VITE_WS_HOST + "/notifications");

test("should create a NotificationService instance", async () => {
  const notificationRepository = new NotificationsRepository();
  const notificationService = new NotificationService(notificationRepository);

  notificationService.openWebSocketNotifications();

  mockServer.emit("message", JSON.stringify(notification));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  expect(notificationService.notifications()[0]).toEqual(
    new NotificationModel(notification)
  );
});
