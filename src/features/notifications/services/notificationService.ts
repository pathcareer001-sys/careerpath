import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

import type { Notification } from "@/types/notification";

export const notificationService = {
  async createNotification(data: Omit<Notification, "id">) {
    return addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), data);
  },

  async getUserNotifications(userId: string) {
    const q = query(
      collection(db, COLLECTIONS.NOTIFICATIONS),
      where("userId", "==", userId),
    );

    const snapshot = await getDocs(q);

    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Notification[];

    return notifications.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },

  async markAsRead(id: string) {
    await updateDoc(doc(db, COLLECTIONS.NOTIFICATIONS, id), {
      read: true,
    });
  },
  subscribeToNotifications(
    userId: string,
    callback: (notifications: Notification[]) => void,
  ) {
    const q = query(
      collection(db, COLLECTIONS.NOTIFICATIONS),
      where("userId", "==", userId),
    );

    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Notification[];

      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      callback(data);

      callback(data);
    });
  },
};
