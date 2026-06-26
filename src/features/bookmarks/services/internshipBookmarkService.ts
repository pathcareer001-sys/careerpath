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
import type { InternshipBookmark } from "@/types/internshipBookmark";

export const internshipBookmarkService = {
  async getBookmarks(userId: string): Promise<InternshipBookmark[]> {
    const q = query(
      collection(db, COLLECTIONS.INTERNSHIP_BOOKMARKS),
      where("userId", "==", userId),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as InternshipBookmark));
  },

  async createBookmark(userId: string, internshipId: string) {
    const q = query(
      collection(db, COLLECTIONS.INTERNSHIP_BOOKMARKS),
      where("userId", "==", userId),
      where("internshipId", "==", internshipId),
    );
    const existing = await getDocs(q);
    if (!existing.empty) {
      throw new Error("Already bookmarked");
    }
    return addDoc(collection(db, COLLECTIONS.INTERNSHIP_BOOKMARKS), {
      userId,
      internshipId,
      createdAt: new Date().toISOString(),
    });
  },

  async deleteBookmark(bookmarkId: string) {
    return deleteDoc(doc(db, COLLECTIONS.INTERNSHIP_BOOKMARKS, bookmarkId));
  },
};
