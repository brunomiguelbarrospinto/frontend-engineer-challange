import { expect, test } from "vitest";

import { renderNotificationsBadge } from "./NotificationsBadge";

test("Should render notifications badge", () => {
  const htmlNoNotification = renderNotificationsBadge(0);
  expect(htmlNoNotification).toContain("Notifications");

  const htmlWithNotifications = renderNotificationsBadge(2);
  expect(htmlWithNotifications).toContain("New documents added");
});
