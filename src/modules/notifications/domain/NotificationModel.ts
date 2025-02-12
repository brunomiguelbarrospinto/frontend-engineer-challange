import { generateMock } from "@anatine/zod-mock";
import { z } from "zod";

export const NotificationSchema = z.object({
  Timestamp: z.string().datetime(),
  UserID: z.string(),
  UserName: z.string(),
  DocumentID: z.string(),
  DocumentTitle: z.string(),
});

export type Notification = z.infer<typeof NotificationSchema>;

export function createNotificationMock(
  overwrite?: Partial<z.infer<typeof NotificationSchema>>
) {
  return { ...generateMock(NotificationSchema), ...overwrite };
}

export function createNotificationModelMock(
  overwrite?: Partial<z.infer<typeof NotificationSchema>>
) {
  return new NotificationModel(createNotificationMock(overwrite));
}

export class NotificationModel {
  public timestamp: string;
  public userID: string;
  public userName: string;
  public documentID: string;
  public documentTitle: string;

  constructor(notification: Notification) {
    this.timestamp = notification.Timestamp;
    this.userID = notification.UserID;
    this.userName = notification.UserName;
    this.documentID = notification.DocumentID;
    this.documentTitle = notification.DocumentTitle;
  }
}
