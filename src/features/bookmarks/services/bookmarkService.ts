import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

export const bookmarkService = {
  async getBookmarks(userId: string) {
    const q = query(
      collection(db, COLLECTIONS.BOOKMARKS),
      where("userId", "==", userId),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createBookmark(userId: string, companyId: string) {
    const q = query(
      collection(db, COLLECTIONS.BOOKMARKS),
      where("userId", "==", userId),
      where("companyId", "==", companyId),
    );

    const existing = await getDocs(q);

    if (!existing.empty) {
      throw new Error("Company already bookmarked");
    }

    return addDoc(collection(db, COLLECTIONS.BOOKMARKS), {
      userId,
      companyId,
    });
  },

  async getBookmarkByCompany(userId: string, companyId: string) {
    const q = query(
      collection(db, COLLECTIONS.BOOKMARKS),
      where("userId", "==", userId),
      where("companyId", "==", companyId),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs[0] || null;
  },

  async deleteBookmark(bookmarkId: string) {
    return deleteDoc(doc(db, COLLECTIONS.BOOKMARKS, bookmarkId));
  },
};
