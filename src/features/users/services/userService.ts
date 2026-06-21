import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/firestore";

import { COLLECTIONS } from "@/constants/collections";

import type { AppUser } from "@/types/user";

export const userService = {
  async getUser(uid: string) {
    const snapshot = await getDoc(doc(db, COLLECTIONS.USERS, uid));

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data() as AppUser;
  },
};
