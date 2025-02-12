import {
  NotificationModel,
  createNotificationMock,
  createNotificationModelMock,
} from "./NotificationModel";
import { expect, test } from "vitest";

test("should create a NotificationModel instance", () => {
  const notification = createNotificationMock();
  const notificationModel = new NotificationModel(notification);

  expect(notificationModel.timestamp).toBe(notification.Timestamp);
  expect(notificationModel.userID).toBe(notification.UserID);
  expect(notificationModel.userName).toBe(notification.UserName);
  expect(notificationModel.documentID).toBe(notification.DocumentID);
  expect(notificationModel.documentTitle).toBe(notification.DocumentTitle);

  // Test overwritten values
  const notificationModelMock = createNotificationModelMock({
    UserName: "Bruno",
  });

  expect(notificationModelMock.userName).toEqual("Bruno");
});
