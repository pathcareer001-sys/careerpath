export interface Notification {
  id: string;

  userId: string;

  title: string;

  message: string;

  type: "application" | "review" | "system";

  read: boolean;

  createdAt: string;
}
