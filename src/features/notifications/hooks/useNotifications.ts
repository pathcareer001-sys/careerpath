import { useEffect, useState } from "react";

import type { Notification } from "@/types/notification";

import { notificationService } from "../services/notificationService";

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = notificationService.subscribeToNotifications(
      userId,
      setNotifications,
    );

    return () => unsubscribe();
  }, [userId]);

  return {
    data: notifications,
  };
}
